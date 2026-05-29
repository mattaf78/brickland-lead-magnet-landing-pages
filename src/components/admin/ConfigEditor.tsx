import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type Path = (string | number)[];

type Props = {
  value: any;
  onChange: (next: any) => void;
};

function setAtPath(obj: any, path: Path, val: any): any {
  if (path.length === 0) return val;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[head as number] = setAtPath(copy[head as number], rest, val);
    return copy;
  }
  return { ...obj, [head as string]: setAtPath(obj?.[head as string], rest, val) };
}

function removeAtPath(obj: any, path: Path): any {
  if (path.length === 0) return undefined;
  const [head, ...rest] = path;
  if (rest.length === 0) {
    if (Array.isArray(obj)) {
      const copy = [...obj];
      copy.splice(head as number, 1);
      return copy;
    }
    const copy = { ...obj };
    delete copy[head as string];
    return copy;
  }
  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[head as number] = removeAtPath(copy[head as number], rest);
    return copy;
  }
  return { ...obj, [head as string]: removeAtPath(obj?.[head as string], rest) };
}

export function ConfigEditor({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <NodeEditor
        node={value}
        path={[]}
        label="Page config"
        onSet={(p, v) => onChange(setAtPath(value, p, v))}
        onRemove={(p) => onChange(removeAtPath(value, p))}
        defaultOpen
      />
    </div>
  );
}

function NodeEditor({
  node, path, label, onSet, onRemove, defaultOpen = false,
}: {
  node: any;
  path: Path;
  label: string;
  onSet: (path: Path, value: any) => void;
  onRemove: (path: Path) => void;
  defaultOpen?: boolean;
}) {
  if (node === null || node === undefined) {
    return (
      <FieldRow label={label}>
        <Input value="" onChange={(e) => onSet(path, e.target.value)} placeholder="(empty)" />
      </FieldRow>
    );
  }

  if (typeof node === "boolean") {
    return (
      <FieldRow label={label}>
        <Switch checked={node} onCheckedChange={(c) => onSet(path, c)} />
      </FieldRow>
    );
  }

  if (typeof node === "number") {
    return (
      <FieldRow label={label}>
        <Input
          type="number"
          value={node}
          onChange={(e) => onSet(path, e.target.value === "" ? null : Number(e.target.value))}
        />
      </FieldRow>
    );
  }

  if (typeof node === "string") {
    const isLong = node.length > 80 || node.includes("\n");
    return (
      <FieldRow label={label}>
        {isLong ? (
          <Textarea value={node} onChange={(e) => onSet(path, e.target.value)} rows={Math.min(8, Math.max(2, node.split("\n").length))} />
        ) : (
          <Input value={node} onChange={(e) => onSet(path, e.target.value)} />
        )}
      </FieldRow>
    );
  }

  if (Array.isArray(node)) {
    return (
      <Collapsible label={`${label} (${node.length})`} defaultOpen={defaultOpen}>
        <div className="space-y-2 pl-3 border-l">
          {node.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">#{idx + 1}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => onRemove([...path, idx])}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <NodeEditor
                node={item}
                path={[...path, idx]}
                label=""
                onSet={onSet}
                onRemove={onRemove}
                defaultOpen
              />
            </div>
          ))}
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => {
              const template = node.length > 0
                ? cloneTemplate(node[0])
                : "";
              onSet([...path, node.length], template);
            }}
          >
            <Plus className="h-3 w-3 mr-1" /> Add item
          </Button>
        </div>
      </Collapsible>
    );
  }

  // object
  const entries = Object.entries(node);
  return (
    <Collapsible label={label} defaultOpen={defaultOpen}>
      <div className="space-y-3 pl-3 border-l">
        {entries.map(([k, v]) => (
          <NodeEditor
            key={k}
            node={v}
            path={[...path, k]}
            label={k}
            onSet={onSet}
            onRemove={onRemove}
          />
        ))}
      </div>
    </Collapsible>
  );
}

function cloneTemplate(item: any): any {
  if (item === null || item === undefined) return "";
  if (typeof item === "string") return "";
  if (typeof item === "number") return 0;
  if (typeof item === "boolean") return false;
  if (Array.isArray(item)) return [];
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(item)) out[k] = cloneTemplate(v);
  return out;
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  if (!label) return <div>{children}</div>;
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground font-normal">{label}</Label>
      {children}
    </div>
  );
}

function Collapsible({
  label, defaultOpen, children,
}: { label: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);
  if (!label) return <>{children}</>;
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium hover:text-primary"
      >
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {label}
      </button>
      {open && children}
    </div>
  );
}