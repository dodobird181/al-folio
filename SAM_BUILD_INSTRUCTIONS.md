# Sam's Site-building instructions!
**In the main project directory:**
1. `sudo docker compose up -d`
2. `sudo docker compose exec -it jekyll bundle exec jekyll build`
3. `sudo rm -r sam_build`
3. `sudo docker compose cp jekyll:/srv/jekyll/_site sam_build/`