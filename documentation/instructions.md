# Developer Customization Guidelines

This document provides engineering guidance on how to adjust parameters, expand styles, and update data states for the ApexGrowth Template.

---

## 1. Adjusting Theme Color Schemes

All layout colors map to HSL coordinates in the `:root` variables block inside [main.css](file:///d:/Ashok/HTML%20Pages/Digital%20Marketing%20Agency/assets/css/main.css):

```css
:root {
    --primary-h: 224;
    --primary-s: 86%;
    --primary-l: 58%;
    /* Computes to hsl(224, 86%, 58%) or #2563EB */
}
```

To update the primary accent color globally (e.g. to a purple theme):
- Change `--primary-h: 262` (hue)
- Adjust saturation (`--primary-s`) and lightness (`--primary-l`) coordinates accordingly. Hover effects and alpha shadows auto-generate from these settings.

---

## 2. Mock State Storage Schemas

Data values for creative assets, invoices, messages, and target goals reside in the browser's `localStorage` to simulate backend synchronization. They load on initiation inside [dashboard.js](file:///d:/Ashok/HTML%20Pages/Digital%20Marketing%20Agency/assets/js/dashboard.js):

- **Creative Approval Record Structure:**
  ```json
  {
      "id": 1,
      "title": "Summer Sales Banner - Facebook Ads",
      "type": "Image Banner",
      "size": "1200x628",
      "image": "https://picsum.photos/id/26/600/300",
      "status": "pending",
      "comments": ["Please verify the brand accent color."]
  }
  ```

- **Resetting storage state to defaults:**
  Run the following script command in your browser's inspect console:
  ```javascript
  localStorage.clear();
  window.location.reload();
  ```

---

## 3. Dynamic Charts Modification

The SVG line graphs are drawn dynamically by `drawDashboardCharts()` inside `dashboard.js`. 
To modify datasets values (e.g. showing different monthly numbers):
- Open `dashboard.js`
- Adjust the numerical values in `sessionsData` and `conversionsData`:
  ```javascript
  const sessionsData = [12000, 14200, 16800, 15500, 19200, 22400];
  const conversionsData = [450, 520, 610, 580, 780, 890];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  ```
The rendering coordinates automatically recalibrate scaling parameters and chart height ratios.
