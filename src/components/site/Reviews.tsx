import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SectionHeader } from "./MenuSection";
import { cn } from "@/lib/utils";

type Review = { name: string; rating: number; comment: string };

const seed: Review[] = [
  { name: "Ahmed R.", rating: 5, comment: "The Lazania Pizza is unreal — best in Jahanian. AC hall is super comfy too!" },
  { name: "Fatima K.", rating: 5, comment: "Family deal fed all 6 of us and delivery was super quick. Highly recommend." },
  { name: "Bilal H.", rating: 4, comment: "MFC 20-20 burger is now my regular order. Loaded fries are a must-try." },
  { name: "Sana M.", rating: 5, comment: "Their cold coffee and brownie shake hit different. Loved the vibe." },
];

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(seed);
  const [form, setForm] = useState<Review>({ name: "", rating: 5, comment: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setReviews([form, ...reviews]);
    setForm({ name: "", rating: 5, comment: "" });
    toast.success("Thanks for your feedback!");
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Reviews" title="What Our Guests Say" />

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {reviews.slice(0, 6).map((r, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 hover:shadow-warm transition-shadow animate-fade-up">
                <div className="flex gap-0.5 text-accent mb-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={cn("h-4 w-4", idx < r.rating ? "fill-current" : "opacity-30")} />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">"{r.comment}"</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">— {r.name}</p>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 space-y-3 h-fit">
            <h3 className="font-display text-2xl">Leave a Review</h3>
            <div>
              <Label htmlFor="rname">Your Name</Label>
              <Input id="rname" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Rating</Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setForm({ ...form, rating: n })}
                    aria-label={`${n} stars`}
                  >
                    <Star className={cn("h-6 w-6 transition-colors", n <= form.rating ? "fill-accent text-accent" : "text-muted-foreground/40")} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="rcom">Comment</Label>
              <Textarea id="rcom" required rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Submit Review</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
