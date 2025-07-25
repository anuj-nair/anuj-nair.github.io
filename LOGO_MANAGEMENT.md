# 🎨 Logo Management Guide

This guide explains how to manage and update skill logos in your React portfolio.

## 📁 File Structure

```
public/
├── data/
│   └── skills.json          # Skills configuration
└── assets/
    └── icons/               # Logo files (.svg preferred)
        ├── python.svg
        ├── javascript.svg
        └── ...
```

## 🔧 Configuration System

### Skills Data Location
- **File**: `/public/data/skills.json`
- **Format**: JSON with skill departments and logo information
- **Hot Reload**: Changes are reflected immediately in development

### JSON Structure
```json
{
  "skillDepartments": [
    {
      "id": "programming",
      "title": "Programming Languages",
      "description": "Core programming languages and scripting",
      "color": "#3b82f6",
      "skills": [
        {
          "name": "Python",
          "iconPath": "/assets/icons/python.svg",
          "hasIcon": true
        },
        {
          "name": "Missing Tool",
          "iconPath": "/assets/icons/missing.svg",
          "hasIcon": false,
          "fallbackIcon": "fas fa-code",
          "downloadUrl": "https://example.com/logo.svg"
        }
      ]
    }
  ]
}
```

## 📥 Missing Logos - Download Links

### 🔗 Direct Download URLs

1. **Seaborn** (Statistical visualization)
   - URL: https://seaborn.pydata.org/_static/logo-wide-lightbg.svg
   - Save as: `seaborn.svg`

2. **GitLab** (CI/CD platform)
   - URL: https://about.gitlab.com/images/press/logo/svg/gitlab-logo-gray-rgb.svg
   - Save as: `gitlab.svg`

3. **REST API** (OpenAPI)
   - URL: https://www.svgrepo.com/download/306500/openapi-initiative.svg
   - Save as: `api.svg`

4. **Jama Software** (Requirements management)
   - URL: https://www.jamasoftware.com/media/2019/12/jama-software-logo.svg
   - Save as: `jama.svg`

5. **Selenium** (Web automation)
   - URL: https://selenium.dev/images/selenium_logo_square_green.png
   - Note: Convert PNG to SVG or use as is
   - Save as: `selenium.svg`

6. **FastAPI** (Python web framework)
   - URL: https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png
   - Note: Convert PNG to SVG or use as is
   - Save as: `fastapi.svg`

### 🛠️ Alternative Logo Sources

- **Simple Icons**: https://simpleicons.org/
- **SVG Repo**: https://www.svgrepo.com/
- **Icons8**: https://icons8.com/icons/set/technology
- **Devicon**: https://devicon.dev/

## 🔄 Adding New Skills

### 1. Update JSON Configuration
```json
{
  "name": "New Technology",
  "iconPath": "/assets/icons/new-tech.svg",
  "hasIcon": true
}
```

### 2. Add Logo File
- Download SVG logo
- Place in `/public/assets/icons/`
- Use descriptive filename (e.g., `new-tech.svg`)

### 3. Test Configuration
- Restart development server
- Check browser console for loading errors
- Verify logo appears correctly

## 🎨 Logo Guidelines

### Preferred Format
- **SVG**: Vector format, scalable, small file size
- **Size**: Optimized for 48x48px display
- **Colors**: Monochrome or brand colors

### Fallback Options
1. **FontAwesome Icons**: Use `fallbackIcon` property
2. **Generic Icons**: `fas fa-code`, `fas fa-database`, etc.
3. **Brand Icons**: `fab fa-python`, `fab fa-js-square`, etc.

## 🔍 Troubleshooting

### Logo Not Appearing
1. Check file path in JSON
2. Verify file exists in `/public/assets/icons/`
3. Check browser console for 404 errors
4. Ensure `hasIcon: true` in configuration

### Development Debug Info
- Missing logos are listed in development mode
- Console logs show failed icon loads
- Download URLs provided for missing icons

### Performance Tips
- Use SVG format when possible
- Optimize file sizes (< 10KB recommended)
- Use consistent naming convention
- Avoid special characters in filenames

## 🚀 Deployment Considerations

### Production Build
- All icons must be in `/public/assets/icons/`
- JSON file is fetched at runtime
- Missing icons show fallback FontAwesome icons

### CDN Optimization
- Consider using icon CDN for common logos
- Update `iconPath` to CDN URLs
- Maintain local fallbacks

## 📊 Current Status

### ✅ Available Icons
- Python, JavaScript, Bash, R, Rust, Java, LaTeX
- TensorFlow, Keras, PyTorch, Pandas, NumPy, Plotly
- AWS, Docker, Jenkins, Linux, Git
- Django, Flask, PostgreSQL, SQLite
- N8N, Jupyter, VS Code, Postman

### ⏳ Missing Icons (with download links)
- Seaborn, GitLab, REST API, Jama, Selenium, FastAPI

### 🔄 Easy Updates
- Edit `/public/data/skills.json`
- Add new logo files to `/public/assets/icons/`
- No code changes required

---

**Note**: The skills system automatically handles missing icons with fallbacks and provides download links in development mode for easy logo management.
