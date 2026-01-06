.PHONY: help build up down restart logs shell clean health test

# Default target
help:
	@echo "CyberWatch Docker Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make build    - Build Docker image"
	@echo "  make up       - Start containers"
	@echo "  make down     - Stop containers"
	@echo "  make restart  - Restart containers"
	@echo "  make logs     - View logs"
	@echo "  make shell    - Open shell in container"
	@echo "  make clean    - Remove containers and images"
	@echo "  make health   - Check application health"
	@echo "  make rebuild  - Rebuild and restart"

# Build Docker image
build:
	@echo "Building Docker image..."
	docker-compose build

# Start containers
up:
	@echo "Starting containers..."
	docker-compose up -d
	@echo "Application running at http://localhost:3000"

# Stop containers
down:
	@echo "Stopping containers..."
	docker-compose down

# Restart containers
restart:
	@echo "Restarting containers..."
	docker-compose restart

# View logs
logs:
	docker-compose logs -f cyberwatch

# Open shell in container
shell:
	docker-compose exec cyberwatch sh

# Clean up containers and images
clean:
	@echo "Cleaning up..."
	docker-compose down -v
	docker system prune -f

# Check health
health:
	@echo "Checking application health..."
	@curl -s http://localhost:3000/api/health | jq '.' || echo "Health check failed"

# Rebuild and restart
rebuild:
	@echo "Rebuilding and restarting..."
	docker-compose down
	docker-compose up -d --build
	@echo "Application rebuilt and running at http://localhost:3000"

# Check cache stats
cache-stats:
	@echo "Checking cache statistics..."
	@curl -s http://localhost:3000/api/news/cache | jq '.' || echo "Cache stats unavailable"

# Clear cache
cache-clear:
	@echo "Clearing cache..."
	@curl -X DELETE http://localhost:3000/api/news/cache
	@echo "Cache cleared"

