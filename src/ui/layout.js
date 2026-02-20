export function initLayout() {

  const navItems = document.querySelectorAll('.ct-nav-item')
  const views = document.querySelectorAll('.ct-view')
  const pageTitle = document.getElementById('ct-page-title')

  navItems.forEach(btn => {
    btn.addEventListener('click', () => {

      navItems.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      const view = btn.dataset.view

      views.forEach(v => v.classList.remove('active'))
      const target = document.getElementById(`view-${view}`)
      if (target) target.classList.add('active')

      if (pageTitle) pageTitle.textContent = btn.textContent
    })
  })

}
