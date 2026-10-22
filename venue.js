/* iL MOTORRE: табло пит-стопа, открытые точки поднимаются наверх */
(function () {
  var b = document.querySelector('[data-pit]'), say = document.querySelector('[data-say7]');
  if (!b) return;
  function sort() {
    var li = [].slice.call(b.children);
    li.sort(function (x, y) { return (y.querySelector('.st.on') ? 1 : 0) - (x.querySelector('.st.on') ? 1 : 0); });
    li.forEach(function (l, i) { l.querySelector('.pos').textContent = 'P' + (i + 1); b.appendChild(l); });
    var on = b.querySelectorAll('.st.on').length;
    say.textContent = on ? 'Сейчас открыто точек: ' + on + ' из 7.' : 'Сейчас все закрыты. Киоск на Ленинградском откроется в 7:30.';
  }
  setTimeout(sort, 50); setInterval(sort, 60000);
})();
(function () {
  var el = document.querySelector('[data-lap]'), say = document.querySelector('[data-lapsay]');
  if (!el) return;
  var H = { 1: [7.45, 20.95], 2: [7.45, 20.95], 3: [7.45, 20.95], 4: [7.45, 20.95], 5: [7.45, 21.95], 6: [8.45, 21.95], 0: [8.45, 20.95] };
  function p(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var d = new Date(Date.now() + 3 * 3600e3), t = d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600, h = H[d.getUTCDay()];
    var left, txt;
    if (t >= h[0] && t < h[1]) { left = h[1] - t; txt = 'до закрытия'; }
    else { left = t < h[0] ? h[0] - t : 24 - t + H[(d.getUTCDay() + 1) % 7][0]; txt = 'до открытия'; }
    var s = Math.floor(left * 3600);
    el.textContent = p(Math.floor(s / 3600)) + ':' + p(Math.floor(s % 3600 / 60)) + ':' + p(s % 60);
    say.textContent = txt;
  }
  tick(); setInterval(tick, 1000);
})();
