import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/the-receipts")({
  component: TheReceiptsLayout,
});

function TheReceiptsLayout() {
  return <Outlet />;
}
