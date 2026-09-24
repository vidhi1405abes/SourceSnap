# SourceSnap — fix package

## Ye app karti kya hai

Code padhne se ye pata chala: SourceSnap ek personal "second brain" archive
hai. Tum jab bhi koi useful cheez (article, video, doc) browse kar rahe ho,
usko URL + ek chhota topic name + notes ke saath save kar lete ho, aur
`dashboard/index.html` un sab saved cheezon ko cards mein dikhata hai
(search + domain filter + "today/this week/all" filter ke saath).

Original repo mein sirf `index.html` tha — Supabase project (jahan data store
hota tha) ka URL/key hardcoded thi, lekin:
- Wo project shayad ab exist nahi karta / uske credentials tumhare paas nahi.
- Jo Chrome extension isme data daalta tha (browse karte waqt "save"
  karne wala), uska code kabhi commit hi nahi hua — sirf dashboard tha.

Is fix package mein dono cheezein bana di gayi hain.

## Steps

### 1. Naya Supabase project banao
- supabase.com par free account/project banao.
- Project ke andar "SQL Editor" kholo, is package ke `schema.sql` file ka
  poora content paste karke Run karo. Isse `learnings` table aur zaroori
  permissions (RLS policies) ban jayengi.
- Project Settings > API mein jaake apna **Project URL** aur **anon public
  key** copy kar lo.

### 2. Dashboard mein credentials daalo
- `dashboard/index.html` kholo, `SUPABASE_URL` aur `SUPABASE_KEY` wali do
  lines mein apna copy kiya hua URL/key paste karo.
- Is file ko seedha double-click karke browser mein khol sakte ho, ya
  VS Code Live Server se.

### 3. Chrome extension load karo
- `extension/config.js` kholo, wahi SUPABASE_URL aur SUPABASE_KEY paste karo
  (dashboard jaisa hi, exact same values).
- Chrome mein `chrome://extensions` kholo.
- Top-right "Developer mode" ON karo.
- "Load unpacked" par click karke is package ke `extension` folder ko
  select karo.
- Extension icon toolbar mein aa jayega.

### 4. Test karo
- Kisi bhi webpage par jaake extension icon click karo — URL aur page title
  apne aap bhar jayega, topic name edit kar sakte ho, notes daal ke "Save to
  SourceSnap" dabao.
- `dashboard/index.html` ko refresh karo — wahi entry card ki tarah dikhni
  chahiye.
