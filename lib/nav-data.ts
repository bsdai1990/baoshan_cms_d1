import "server-only";

import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";

import {
  executeStatement,
  queryRows,
  type StatementValue,
} from "@/lib/mysql";
import type { NavItem } from "@/types";

type NavItemRow = RowDataPacket & NavItem;

function mapNavItem(row: NavItemRow): NavItem {
  return {
    id: row.id,
    label: row.label,
    href: row.href,
    sort_order: Number(row.sort_order),
    is_visible: Boolean(row.is_visible),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export type NavItemInput = {
  label: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
};

export async function getNavItems(options?: { visibleOnly?: boolean }) {
  const where = options?.visibleOnly ? "WHERE is_visible = 1" : "";
  const rows = await queryRows<NavItemRow[]>(
    `SELECT id, label, href, sort_order, is_visible, created_at, updated_at
     FROM nav_items
     ${where}
     ORDER BY sort_order ASC`
  );
  return rows.map(mapNavItem);
}

export async function createNavItem(input: NavItemInput) {
  const id = randomUUID();
  await executeStatement(
    `INSERT INTO nav_items (id, label, href, sort_order, is_visible)
     VALUES (?, ?, ?, ?, ?)`,
    [id, input.label, input.href, input.sort_order, input.is_visible]
  );
  return getNavItemById(id);
}

export async function updateNavItem(id: string, input: NavItemInput) {
  await executeStatement(
    `UPDATE nav_items SET
      label = ?,
      href = ?,
      sort_order = ?,
      is_visible = ?
    WHERE id = ?`,
    [input.label, input.href, input.sort_order, input.is_visible, id]
  );
  return getNavItemById(id);
}

export async function deleteNavItem(id: string) {
  await executeStatement("DELETE FROM nav_items WHERE id = ?", [id]);
}

export async function getNavItemById(id: string) {
  const rows = await queryRows<NavItemRow[]>(
    "SELECT id, label, href, sort_order, is_visible, created_at, updated_at FROM nav_items WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ? mapNavItem(rows[0]) : null;
}

export async function reorderNavItems(items: { id: string; sort_order: number }[]) {
  await Promise.all(
    items.map((item) =>
      executeStatement(
        "UPDATE nav_items SET sort_order = ? WHERE id = ?",
        [item.sort_order, item.id]
      )
    )
  );
  return getNavItems();
}
