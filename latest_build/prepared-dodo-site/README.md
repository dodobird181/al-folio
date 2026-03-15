# The Prepared Dodo - Website Deployment Guide

Simple one-page website for The Prepared Dodo business.

## Files

- `index.html` - Main website page
- `styles.css` - Styling
- `nginx.conf` - Nginx server configuration

## Deployment Steps

### 1. Upload Files to Server

```bash
# On your local machine, from this directory:
scp index.html styles.css your-user@your-server-ip:/tmp/

# On your server:
sudo mkdir -p /var/www/preparedodo
sudo mv /tmp/index.html /tmp/styles.css /var/www/preparedodo/
sudo chown -R www-data:www-data /var/www/preparedodo
sudo chmod -R 755 /var/www/preparedodo
```

### 2. Install Nginx (if not already installed)

```bash
sudo apt update
sudo apt install nginx
```

### 3. Configure Nginx

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/preparedodo

# Create symlink to enable site
sudo ln -s /etc/nginx/sites-available/preparedodo /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 4. Configure DNS

Point your domain to your server IP:
- A record: `thepreparedodo.com` → `your-server-ip`
- A record: `www.thepreparedodo.com` → `your-server-ip`

Wait for DNS propagation (can take up to 48 hours, usually much faster).

### 5. Enable HTTPS with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate (will auto-configure nginx)
sudo certbot --nginx -d thepreparedodo.com -d www.thepreparedodo.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 6. Configure Firewall (if using UFW)

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Customization

### Update Email Address

Change `hello@thepreparedodo.com` in `index.html` line 44 to your actual email.

### Update Domain Name

If using a different domain, update:
- `nginx.conf` line 6: `server_name` directive
- DNS settings to point to your server
- Certbot command in step 5

### Modify Colors

Edit CSS variables in `styles.css` lines 1-6:
```css
--primary-color: #2c3e50;  /* Dark blue-gray */
--accent-color: #3498db;   /* Bright blue */
```

### Add Logo

Replace text logo with image in `index.html` line 11:
```html
<img src="logo.webp" alt="The Prepared Dodo" class="logo">
```

## Testing

Once deployed, test at:
- http://thepreparedodo.com (will redirect to HTTPS after certbot)
- https://thepreparedodo.com

## Maintenance

SSL certificates auto-renew via certbot cron job. Check renewal status:
```bash
sudo certbot certificates
```

## Troubleshooting

**Site not loading:**
- Check nginx status: `sudo systemctl status nginx`
- Check error logs: `sudo tail -f /var/log/nginx/preparedodo_error.log`
- Verify DNS: `dig thepreparedodo.com`

**Permission errors:**
- Ensure correct ownership: `sudo chown -R www-data:www-data /var/www/preparedodo`
- Check file permissions: `sudo chmod -R 755 /var/www/preparedodo`
