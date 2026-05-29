import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPages, createPage, deletePage } from "@/lib/leadMagnetPages.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const listFn = useServerFn(listPages);
  const createFn = useServerFn(createPage);
  const deleteFn = useServerFn(deletePage);
  const qc = useQueryClient();

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["admin", "pages"],
    queryFn: () => listFn(),
  });

  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [fromSlug, setFromSlug] = useState("");

  const createMut = useMutation({
    mutationFn: () => createFn({ data: { slug, title, fromSlug: fromSlug || undefined } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
      toast.success("Page created");
      setOpen(false);
      setSlug(""); setTitle(""); setFromSlug("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
      toast.success("Page deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Landing pages</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button>New page</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create a new page</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Slug (URL)</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. newpage" />
                <p className="text-xs text-muted-foreground">Lowercase letters, numbers, hyphens. Becomes /yourslug</p>
              </div>
              <div className="space-y-1">
                <Label>Admin title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. New Campaign" />
              </div>
              <div className="space-y-1">
                <Label>Duplicate from (optional)</Label>
                <Input value={fromSlug} onChange={(e) => setFromSlug(e.target.value)} placeholder="e.g. thetruth" />
                <p className="text-xs text-muted-foreground">Copies the content from this existing page as a starting point.</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => createMut.mutate()} disabled={!slug || !title || createMut.isPending}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : pages.length === 0 ? (
        <p className="text-muted-foreground">No pages yet.</p>
      ) : (
        <div className="border rounded-lg divide-y">
          {pages.map((p: any) => (
            <div key={p.id} className="flex items-center justify-between p-4 gap-4">
              <div className="min-w-0">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-sm text-muted-foreground">
                  /{p.slug} · {p.published ? "Published" : "Draft"} · updated {new Date(p.updated_at).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button asChild variant="outline" size="sm">
                  <a href={`/${p.slug}`} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" /> View
                  </a>
                </Button>
                <Button asChild size="sm">
                  <Link to="/admin/$slug" params={{ slug: p.slug }}>Edit</Link>
                </Button>
                <Button
                  variant="ghost" size="sm"
                  onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteMut.mutate(p.id); }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}