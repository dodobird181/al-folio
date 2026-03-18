# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an **al-folio** academic portfolio website - a Jekyll-based static site generator designed for academics. The site is currently customized for Samuel Jack Morris's personal portfolio.

## Development Commands

### Recommended: Docker (Primary Development Method)

```bash
# Pull and run using pre-built image
docker compose pull
docker compose up

# Access site at http://localhost:8080

# Slim version (smaller image, same functionality)
docker compose -f docker-compose-slim.yml up

# Rebuild custom docker image
docker compose up --build
```

### Local Development (Legacy)

```bash
# Install dependencies
bundle install
pip install jupyter

# Serve site locally
bundle exec jekyll serve
# Access at http://localhost:4000

# Build for production
export JEKYLL_ENV=production
bundle exec jekyll build

# Purge unused CSS
purgecss -c purgecss.config.js
```

### Code Quality Checks

```bash
# Format with Prettier
npx prettier --write .

# Check broken links (requires built site)
# Uses lychee via GitHub Actions

# Accessibility testing
# Uses Axe via GitHub Actions (manual run recommended)
```

## Architecture & Structure

### Jekyll Static Site Generator

This site uses Jekyll with a **collections-based architecture**:

- **Collections** (`_config.yml` lines 142-150): `news` and `projects` are the main collections
- **Layouts** in `_layouts/`: Liquid templates that define page structure (about, post, cv, distill, bib)
- **Includes** in `_includes/`: Reusable components (header, footer, social, news, projects)
- **Pages** in `_pages/`: Static pages with frontmatter defining layout and permalink

### Templating System (Liquid)

- Template files use `.liquid` extension
- Includes are referenced with `{% include file.liquid %}`
- Layouts are selected via frontmatter: `layout: about`
- Variables accessed via `{{ site.variable }}` or `{{ page.variable }}`
- Filters used extensively: `| markdownify`, `| relative_url`, `| date_to_string`

### Content Organization

**Key content locations:**
- Blog posts: `_posts/` (format: `YYYY-MM-DD-title.md`)
- Projects: `_projects/`
- News items: `_news/` (displayed on about page)
- Bibliography: `_bibliography/papers.bib` (BibTeX format)
- CV data: `assets/json/resume.json` (JSON Resume standard) or `_data/cv.yml` (fallback)

**Frontmatter patterns:**
```yaml
---
layout: about          # Choose from _layouts/
title: page title
permalink: /about/     # URL path
nav: true             # Show in navigation
nav_order: 2          # Navigation position
---
```

### Configuration System

**Primary config:** `_config.yml`
- Lines 1-21: Site metadata and URLs
- Lines 142-150: Collections configuration
- Lines 206-224: Jekyll plugins
- Lines 274-336: Jekyll Scholar (bibliography) settings
- Lines 387-404: Feature toggles (math, darkmode, analytics, etc.)

**Important:** Changes to `_config.yml` require rebuilding the site. All other changes are reflected immediately.

**URL configuration:**
- Personal site: `url: https://username.github.io`, `baseurl:` (empty)
- Project site: `url: https://username.github.io`, `baseurl: /repo-name/`

### Plugin System

**Custom Ruby plugins** in `_plugins/`:
- `external-posts.rb`: Fetch blog posts from external sources (Medium, RSS feeds)
- `google-scholar-citations.rb`: Add Google Scholar citation counts
- `inspirehep-citations.rb`: Add InspireHEP citation badges
- `hide-custom-bibtex.rb`: Filter custom BibTeX keywords from display
- `details.rb`: Custom Liquid tags for detail/summary elements
- `cache-bust.rb`: Add cache-busting parameters to assets

**Key Jekyll plugins** (from Gemfile):
- `jekyll-scholar`: BibTeX bibliography management
- `jekyll-archives`: Auto-generate archive pages by year/tag/category
- `jekyll-jupyter-notebook`: Embed Jupyter notebooks in posts
- `jekyll-imagemagick`: Responsive image generation
- `jekyll-minifier`: Minify HTML/CSS/JS output

### Styling System

**SASS structure** in `_sass/`:
- `_themes.scss`: Theme color definitions (modify `--global-theme-color` to change site theme)
- `_variables.scss`: Stock color options and reusable variables
- `_base.scss`: Base typography, spacing, and element styles
- `_layout.scss`: Grid, navigation, page structure
- `_cv.scss`: CV page specific styles
- `_distill.scss`: Distill-style blog post formatting

**Customizing theme:**
1. Edit `_sass/_themes.scss` line with `--global-theme-color`
2. Choose from colors defined in `_sass/_variables.scss`
3. Or add custom color to `_variables.scss` with a name

## GitHub Actions Deployment

**Primary workflow:** `.github/workflows/deploy.yml`

Triggers on:
- Push to `main`/`master` branch
- Pull requests
- Manual workflow dispatch

Build steps:
1. Ruby 3.3.5 + Bundler setup
2. Python 3.13 + pip setup
3. Install ImageMagick
4. Install nbconvert for Jupyter notebooks
5. Run `bundle exec jekyll build` with `JEKYLL_ENV=production`
6. Run PurgeCSS to remove unused styles
7. Deploy `_site/` folder to `gh-pages` branch

**Other workflows:**
- `prettier.yml`: Code formatting checks
- `broken-links.yml`: Link validation on built site
- `lighthouse-badger.yml`: Performance/accessibility scoring
- `schedule-posts.txt`: Automated scheduled post publishing (disabled by default, rename to `.yml` to enable)

## Content Modification Patterns

### Adding a blog post
Create file in `_posts/` with format `YYYY-MM-DD-title.md`:
```yaml
---
layout: post
title: Post Title
date: 2024-01-15
categories: category-name
tags: [tag1, tag2]
---
Post content here
```

### Adding a project
Create file in `_projects/`:
```yaml
---
layout: page
title: Project Name
description: Short description
img: assets/img/project-preview.jpg
importance: 1  # Lower = higher in display order
category: work  # or 'fun'
---
Project content
```

### Adding a publication
Add BibTeX entry to `_bibliography/papers.bib`:
```bibtex
@article{key2024,
  title={Paper Title},
  author={Author, Name},
  journal={Journal Name},
  year={2024},
  pdf={paper.pdf},  # Place in assets/pdf/
  code={https://github.com/user/repo},
  selected={true}  # Show in "Selected Publications"
}
```

### Modifying navigation
Edit `nav: true` and `nav_order` in page frontmatter, or modify `_includes/header.liquid` for custom nav structure.

## Data Files

**User/content data** in `_data/`:
- `cv.yml`: Fallback CV data (YAML format)
- `repositories.yml`: GitHub repos to display on repositories page
- `socials.yml`: Social media links (displayed in footer by default)
- `coauthors.yml`: Author metadata for automatic linking in publications

## Important Notes

- **Main branch only**: All development happens on `main`. The `gh-pages` branch is auto-generated and should never be manually edited.
- **Build requirement**: `_config.yml` changes require rebuild. Other file changes are immediate.
- **Dependencies**: ImageMagick must be installed for responsive images (`imagemagick.enabled: true` in config)
- **Excluded content**: Files/folders listed in `_config.yml` `exclude:` section won't be built (this repo excludes blog, teaching, repositories pages)
- **Resume format**: Supports JSON Resume standard (`assets/json/resume.json`) or YAML format (`_data/cv.yml`). JSON takes precedence.
