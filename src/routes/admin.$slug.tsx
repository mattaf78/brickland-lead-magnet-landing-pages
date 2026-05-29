import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPageForEditor, updatePage } from "@/lib/leadMagnetPages.functions";
import { ConfigEditor } from "@/components/admin/ConfigEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, ArrowLeft, Save } from "lucide-react";

export const Route = createFileRoute("/admin/$slug")({
  component: AdminEditor,
});

function AdminEditor() {
  const { slug } = Route.useParams();
  const getFn = useServerFn(getPageForEditor);
  const updateFn = useServerFn(updatePage);
  const qc = useQueryClient();

  const { data: page, isLoading } = useQuery({
    queryKey: ["admin", "page", slug],
    queryFn: () => getFn({ data: { slug } }),
  });

  const [title, setTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [config, setConfig] = useState<any>(null);
  const [tagId, setTagId] = useState<string>("");
  const [published, setPublished] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setPageSlug(page.slug);
      setConfig(page.config);
      setTagId(page.systeme_tag_id?.toString() ?? "");
      setPublished(page.published);
      setDirty(false);
    }
  }, [page]);

  const saveMut = useMutation({
    mutationFn: () =>
      updateFn({
        data: {
          id: page!.id,
          title,
          slug: pageSlug,
          config,
          systeme_tag_id: tagId === "" ? null : Number(tagId),
          published,
        },
      }),
    onSuccess: () => {
      toast.success("Saved");
      setDirty(false);
      qc.invalidateQueries({ queryKey: ["admin", "page", slug] });
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
      qc.invalidateQueries({ queryKey: ["lead-magnet-page"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading…</p>;
  if (!page) return <p>Page not found.</p>;

  const mark = <T,>(setter: (v: T) => void) => (v: T) => { setter(v); setDirty(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Pages</Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={`/${page.slug}`} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" /> View live
            </a>
          </Button>
          <Button size="sm" onClick={() => saveMut.mutate()} disabled={!dirty || saveMut.isPending}>
            <Save className="h-4 w-4 mr-1" /> {saveMut.isPending ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="font-semibold">Page settings</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Admin title</Label>
            <Input value={title} onChange={(e) => { setTitle(e.target.value); setDirty(true); }} />
          </div>
          <div className="space-y-1">
            <Label>URL slug</Label>
            <Input value={pageSlug} onChange={(e) => { setPageSlug(e.target.value); setDirty(true); }} />
          </div>
          <div className="space-y-1">
            <Label>Systeme.io tag ID</Label>
            <Input type="number" value={tagId} onChange={(e) => { setTagId(e.target.value); setDirty(true); }} />
          </div>
          <div className="flex items-center justify-between gap-3 pt-6">
            <div>
              <Label>Published</Label>
              <p className="text-xs text-muted-foreground">When off, the page returns 404.</p>
            </div>
            <Switch checked={published} onCheckedChange={(c) => { setPublished(c); setDirty(true); }} />
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="font-semibold">Content</h2>
        <p className="text-xs text-muted-foreground">
          Edit any field. Toggle the <code>visible</code> switch inside a section to hide it without deleting.
        </p>
        {config && <ConfigEditor value={config} onChange={mark(setConfig)} />}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => saveMut.mutate()} disabled={!dirty || saveMut.isPending}>
          <Save className="h-4 w-4 mr-1" /> {saveMut.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}