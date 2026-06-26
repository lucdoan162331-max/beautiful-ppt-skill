---
name: beautiful-ppt-skill
description: Create high-end PPT decks with cinematic visual impact, consistent page language, and data-first storytelling. Use when users ask to make slides, optimize PPT design, generate cover pages, unify styles, polish key-data pages, build presentation visuals from source materials, or mention 做PPT、PPT美化、封面设计、汇报排版、重点数据突出.
---

# Beautiful PPT Skill

## Goal

Turn user materials into a premium PPT with:
- high-tension visual style based on contrast,
- coherent cross-page language,
- prominent key conclusions and key data,
- stylized headline typography via generated art text assets.

## Required Inputs

Collect these first:
1. deck purpose and audience,
2. expected page count and presentation length,
3. source materials (text/docs/images/data),
4. preferred tone (tech, policy, heritage, business, youthful, etc.),
5. brand constraints (logo, color, fonts, prohibited elements).

If inputs are incomplete, proceed with sensible defaults and list assumptions clearly.

## Core Design Rules

### 1) Contrast-first backgrounds (visual tension engine)

Every cover/section opener background prompt must include at least 2-3 contrast dimensions:
- light vs dark,
- warm vs cool,
- large vs small subject,
- sparse vs dense composition,
- static vs dynamic motion cues.

Use this prompt structure:

```text
[主题主体] + [场景] + [对比维度1/2/3] + [镜头语言] + [质感关键词] + [留白区域]
```

Example:

```text
A colossal launch vehicle lifting off at night, tiny human silhouettes in foreground,
cold blue atmosphere against warm orange flames, sparse runway versus dense smoke clouds,
cinematic wide-angle shot, ultra-detailed, volumetric light, high contrast, premium keynote background,
clean negative space on left for title, no watermark, no text.
```

### 2) Multi-image style consistency

When generating a set of images, lock these tokens across all prompts:
- color palette (main/accent/background),
- lighting setup,
- texture style,
- camera language,
- atmosphere adjectives.

Generate 4-12 assets in one batch request schema:
- 1 cover background,
- 2-3 section opener backgrounds,
- 3-5 content support images,
- 2-3 decorative element assets (prefer transparent background PNG style).

### 3) Content-first extraction and emphasis

From uploaded materials, extract:
- one-line core message,
- 3-5 key conclusions,
- 3-7 key numbers (with unit/time context),
- evidence items (cases, benchmarks, milestones, risks).

Slide emphasis rules:
- one slide, one main message,
- one key number should dominate a page (big type, color accent, or isolated block),
- supporting text only explains the number, not competes with it,
- use hierarchy `headline > key number > support proof`.

### 4) Material-aware style selection

Map source theme to visual style:
- tech/chips/industry: dark base + metallic accents + glow lines,
- ocean/travel/team spirit: deep blues + wave diagonals + motion curves,
- heritage/culture: warm red/brown + texture overlays + ceremonial symmetry,
- government/reporting: restrained palette + strong grid + clean icons.

If user images exist:
- preserve image integrity (no over-cropping key subject),
- apply unified framing ratio and corner/radius rules,
- use consistent caption and source style.

### 5) Artistic typography workflow

For cover and key-highlight words:
1. Generate artistic title text image (brush/calligraphic/impact style matching theme).
2. Prefer transparent background output; if not available, remove background.
3. Overlay as headline layer; add subtle shadow/glow only when contrast is insufficient.
4. Keep body text readable; art text is for titles and key tags only.

## Execution Workflow

Copy this checklist and execute in order:

```text
Progress
- [ ] Step 1: Parse objective and source materials
- [ ] Step 2: Extract storyline and key numbers
- [ ] Step 3: Define style board and contrast strategy
- [ ] Step 4: Generate backgrounds and reusable elements
- [ ] Step 5: Generate artistic title assets
- [ ] Step 6: Build slide-by-slide structure
- [ ] Step 7: Compose layouts and visual hierarchy
- [ ] Step 8: Final QA and delivery package
```

## Slide Blueprint

Use this default deck pattern unless user overrides:
1. Cover (art title + high-impact background),
2. Agenda/overview,
3. Context/problem,
4. Strategy/framework,
5. Key data page A,
6. Key data page B,
7. Case/proof page,
8. Roadmap/plan,
9. Risk + mitigation,
10. Closing call-to-action.

## Prompt Pack

### A) Background generation prompt

```text
Create a premium PPT background for [topic].
Visual style: [style tags].
Must include contrast: [light-dark], [warm-cool], [large-small].
Composition: [foreground], [midground], [background], with clear negative space at [left/right/top].
Mood: [keywords].
Quality: cinematic, ultra-detailed, high dynamic range, no watermark, no text.
Aspect ratio: 16:9.
```

### B) Consistent element batch prompt

```text
Generate [N] stylistically consistent visual elements for a PPT about [topic].
Keep identical style DNA: palette [..], lighting [..], texture [..], camera [..].
Output set includes: icon-like motifs, abstract shapes, symbolic objects.
Prefer transparent background PNG look, sharp edges, no watermark, no text.
```

### C) Artistic title prompt

```text
Generate artistic Chinese title text for "[title]".
Style: [brush / bold calligraphy / carved metal / futuristic graffiti], theme-aligned.
High readability, strong stroke rhythm, transparent background, no extra words, no watermark.
```

## Quality Gate (must pass before delivery)

- Visual tension: each hero page has explicit contrast logic.
- Consistency: repeated style tokens are visible across all pages.
- Content clarity: key conclusions and key numbers are instantly discoverable.
- Typography control: art text used for emphasis only, body text remains legible.
- Layout discipline: alignment, spacing, and density are consistent.
- Asset hygiene: no watermark, low-res blur, or style drift.

## Output Format

Return:
1. slide-by-slide outline (title + message + visual notes),
2. generated prompt set (backgrounds/elements/art text),
3. key data highlight plan (which number is emphasized on which slide),
4. optional production checklist for final manual polishing.

## Failure Recovery

If visuals lack quality:
1. strengthen contrast dimensions in prompt,
2. reduce competing elements and increase negative space,
3. lock style tokens more strictly for batch generation,
4. regenerate art title with clearer stroke and simpler background.
