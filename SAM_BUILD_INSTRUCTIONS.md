# Sam's Site-building instructions!
**In the main project directory:**
1. `sudo docker compose build`
2. `sudo docker compose up -d`
3. `sudo docker compose exec -it jekyll bundle exec jekyll build`
4. `sudo rm -r latest_build`
5. `sudo docker compose cp jekyll:/srv/jekyll/_site latest_build/`
