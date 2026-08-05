param(
    [switch]$RunServer
)

$root = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
Set-Location $root

Write-Host "Project root: $root"

$venvPath = Join-Path $root ".venv"
if (-not (Test-Path $venvPath)) {
    Write-Host "Creating virtual environment..."
    python -m venv $venvPath
} else {
    Write-Host ".venv already exists. Skipping creation."
}

$activatePath = Join-Path $venvPath "Scripts\Activate.ps1"
if (-not (Test-Path $activatePath)) {
    Write-Error "Could not find activation script at $activatePath"
    exit 1
}

Write-Host "Activating virtual environment..."
. $activatePath

Write-Host "Upgrading pip..."
python -m pip install --upgrade pip

Write-Host "Installing requirements..."
python -m pip install -r requirements.txt

Write-Host "Running migrations..."
python manage.py migrate

Write-Host "Setup complete."

if ($RunServer) {
    Write-Host "Starting Django development server..."
    python manage.py runserver
}
