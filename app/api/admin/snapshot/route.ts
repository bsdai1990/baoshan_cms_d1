import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

import { getCurrentAdminSession } from "@/lib/admin-auth";

type SnapshotEnv = {
  GITHUB_ACTIONS_TOKEN?: string;
  GITHUB_OWNER?: string;
  GITHUB_REPO?: string;
  GITHUB_WORKFLOW_FILE?: string;
  GITHUB_REF?: string;
};

async function getSnapshotEnv(): Promise<SnapshotEnv> {
  let cloudflareEnv: SnapshotEnv = {};

  try {
    const { env } = await getCloudflareContext({ async: true });
    cloudflareEnv = env as SnapshotEnv;
  } catch {
    // Local build/dev fallback uses process.env below.
  }

  return {
    GITHUB_ACTIONS_TOKEN:
      cloudflareEnv.GITHUB_ACTIONS_TOKEN ?? process.env.GITHUB_ACTIONS_TOKEN,
    GITHUB_OWNER:
      cloudflareEnv.GITHUB_OWNER ?? process.env.GITHUB_OWNER ?? "bsdai1990",
    GITHUB_REPO:
      cloudflareEnv.GITHUB_REPO ?? process.env.GITHUB_REPO ?? "baoshan_cms_d1",
    GITHUB_WORKFLOW_FILE:
      cloudflareEnv.GITHUB_WORKFLOW_FILE ??
      process.env.GITHUB_WORKFLOW_FILE ??
      "refresh-snapshot.yml",
    GITHUB_REF: cloudflareEnv.GITHUB_REF ?? process.env.GITHUB_REF ?? "main",
  };
}

export async function POST() {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  const env = await getSnapshotEnv();

  if (!env.GITHUB_ACTIONS_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Missing GITHUB_ACTIONS_TOKEN. Set it with `wrangler secret put GITHUB_ACTIONS_TOKEN`. The token must be allowed to trigger GitHub Actions workflows for this repository.",
      },
      { status: 500 }
    );
  }

  const owner = env.GITHUB_OWNER ?? "bsdai1990";
  const repo = env.GITHUB_REPO ?? "baoshan_cms_d1";
  const workflow = env.GITHUB_WORKFLOW_FILE ?? "refresh-snapshot.yml";
  const ref = env.GITHUB_REF ?? "main";
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;
  const actionsUrl = `https://github.com/${owner}/${repo}/actions/workflows/${workflow}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.GITHUB_ACTIONS_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "baoshan-cms-d1-admin",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      ref,
      inputs: {
        source: "admin-snapshot-button",
        requested_at: new Date().toISOString(),
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return NextResponse.json(
      {
        error: `Failed to trigger GitHub Actions workflow (${response.status}). ${body}`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Snapshot generation and deployment have been queued. Please wait a few minutes for GitHub Actions to finish.",
    actionsUrl,
  });
}
