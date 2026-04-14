#!/bin/bash
# Run from your SalesWebsite root: bash inject_frontmatter.sh

declare -A TITLES
TITLES["Article_1"]="Why Traditional Sales Training Fails Technical People"
TITLES["Article_2"]="The Hidden Blocks That Cost You Sales (And How to Spot Them)"
TITLES["Article_3"]="How AI Changes What Buyers Want – And Why Your Human Skills Matter Even More"
TITLES["Article_4"]="Selling With Integrity: What It Really Means"
TITLES["Article_5"]="The New Frontier: Why Technical Professionals Are More Valuable Than Ever in an AI-Driven World (And What's Still Holding Them Back)"
TITLES["Article_6"]="The Structureless Potential: Why Sales Is an Engineering Problem, Not a Persuasion Problem"
TITLES["Article_7"]="The Person Who Completes This Training Is Not The Same Person Who Started It"
TITLES["Article_8"]="What AI Sales Agents Actually Do — And What They Can't Replace"
TITLES["Article_9"]="The Spreadsheet Is Just the Coping Mechanism"
TITLES["Article_10"]="Why B2B Buyers Are More Emotional Than B2C Buyers — And What To Do About It"
TITLES["Article_11"]="What a Newborn Baby Teaches Us About B2B Sales"
TITLES["Article_12"]="Why 86% of B2B Deals Stall — And It's Not Your Product"
TITLES["Article_13"]="The Real Reason Your Engineers (and Professionals) Resist Sales Training"

for key in "${!TITLES[@]}"; do
  FILE="articles/${key}.md"
  TITLE="${TITLES[$key]}"

  if [ ! -f "$FILE" ]; then
    echo "SKIP (not found): $FILE"
    continue
  fi

  # Remove existing frontmatter block if present
  CONTENT=$(awk '/^---$/{found++; next} found==1{next} found>=2{print} found==0{print}' "$FILE")

  # Remove the first line if it's the title text (duplicate of frontmatter title)
  CONTENT=$(echo "$CONTENT" | awk 'NR==1{next} {print}')

  # Remove CTA / register lines
  CONTENT=$(echo "$CONTENT" | grep -iv "register now\|register for the\|registration\|upcoming training\|click here to register\|sign up for the programme")

  # Write cleaned file
  {
    echo "---"
    echo "layout: base.njk"
    echo "title: \"$TITLE\""
    echo "---"
    echo ""
    echo "$CONTENT"
  } > "${FILE}.tmp" && mv "${FILE}.tmp" "$FILE"

  echo "✓ $FILE"
done

echo ""
echo "All done. Run: npx @11ty/eleventy"
