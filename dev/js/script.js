(function(root) {

  // svg for all
  svg4everybody()
  scrollTo()

  const sliderOptions = {
    'items': {
      cellAlign: 'left',
      pageDots: false,
      prevNextButtons: false,
      draggable: false
    }
  }

  document.querySelectorAll('[data-slider]').forEach((slider, i) => {
    const slides = slider.querySelector('[data-slider-slides]'),
          slidesCount = slides.children.length,
          sliderData = slider.dataset.slider,
          options = sliderOptions[sliderData],
          sliderWidth = slider.offsetWidth,
          slideWidth = slides.children[0].offsetWidth,
          slidesCapacity = Math.round(sliderWidth/slideWidth),
          controls = slider.querySelector('[data-slider-controls]'),
          controlsPrev = controls.querySelector('[data-slider-controls-prev]'),
          controlsNext = controls.querySelector('[data-slider-controls-next]'),
          controlsEndIndex = slidesCount - slidesCapacity,
          adaptive = Number(slider.dataset.sliderAdaptive),
          windowWidth = window.innerWidth

    if (slidesCount > slidesCapacity) {
      slider.classList.add('slider_initial')
      const flkty = new Flickity(slides, sliderOptions[slider.dataset.slider]);

      if (controls) {
        controlsPrev
          .addEventListener('click', (e) => {
            e.preventDefault()
            flkty.previous()
          })

        controlsNext
          .addEventListener('click', (e) => {
            e.preventDefault()
            flkty.next()
          })

        if (flkty.selectedIndex === 0) {
          controlsPrev.disabled = true
        } else if (flkty.selectedIndex === controlsEndIndex) {
          controlsNext.disabled = true
        }

        flkty.on('select', (index) => {
          controlsPrev.disabled = (index == 0) ? true : false
          controlsNext.disabled = (index == controlsEndIndex) ? true : false
        })
      }
    }
  })

  // modals
  document.querySelectorAll('[data-modal-open]').forEach((trigger, i) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault()

      const t = e.target.closest('[data-modal-open]'),
            data = t.dataset.modalOpen,
            modalElement = document.querySelector(`[data-modal="${data}"]`)

      let modalContent = modalElement.innerHTML

      if (data == 'gallery') {
        modalContent = t.innerHTML
      }

      let modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function() {
          this.remove()
        },
        cssClass: modalElement.classList
      });

      modal.setContent(modalContent)
      modal.open()

      const forms = modal.modalBoxContent.querySelectorAll('form')

      try {
        document.querySelector('.modal__close').addEventListener('click', (e) => {
          e.preventDefault()
          modal.close()
        })
      } catch (e) {

      }
    })
  })


})(window);
