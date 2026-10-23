import { notFound } from "next/navigation";
import { getModel, models } from "@/data/models";
import { RoadsterPage } from "@/components/roadster/roadster-page";

export const instant = false;

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  if (slug === "roadster") return <RoadsterPage />;

  return (
    <div style={{ padding: "160px 24px 96px", maxWidth: 1280, margin: "0 auto", color: "var(--color-text)" }}>
      <h1 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em" }}>{model.name}</h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: 8, fontSize: 16 }}>{model.tagline}</p>
      <p style={{ color: "var(--color-text-dim)", marginTop: 32, fontSize: 14 }}>
        Detail page coming next. Only Roadster has an Apply flow.
      </p>
    </div>
  );
}