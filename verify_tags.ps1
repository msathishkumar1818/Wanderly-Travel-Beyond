# verify_tags.ps1
$files = @("pages\destinations.html", "pages\packages.html")

foreach ($file in $files) {
    Write-Host "Verifying $file..."
    $content = Get-Content -Raw -Encoding UTF8 $file
    
    # Check void tags vs container tags
    $tagsToCount = @("div", "section", "main", "body", "html", "h1", "h2", "h3", "h4")
    foreach ($tag in $tagsToCount) {
        $openMatches = [regex]::Matches($content, "<$tag(\s+[^>]*)?>", "IgnoreCase").Count
        $closeMatches = [regex]::Matches($content, "</$tag>", "IgnoreCase").Count
        if ($openMatches -ne $closeMatches) {
            Write-Warning "Mismatch in $file for <$tag>: Open=$openMatches, Close=$closeMatches"
        } else {
            Write-Host "  <$tag> balanced: $openMatches pairs" -ForegroundColor Green
        }
    }
}
