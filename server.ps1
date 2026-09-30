# Lightweight HTTP Server in PowerShell for UX Nightmare App on port 5173
$port = 5173
$prefix = "http://localhost:$port/"
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Output "HTTP server running at $prefix"
} catch {
    Write-Error ("Failed to start listener on " + $prefix + ": " + $_)
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq '/') {
            $urlPath = "index.html"
        }

        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $urlPath))
        
        # Security check: Ensure file is within root directory
        if (-not $filePath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $filePath -PathType Leaf)) {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            continue
        }

        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $response.ContentType = $mime
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
