'use strict';

(function (root) {

  // svg for all
  svg4everybody();
  scrollTo();

  var sliderOptions = {
    'items': {
      cellAlign: 'left',
      pageDots: false,
      prevNextButtons: false
    }
  };

  document.querySelectorAll('[data-slider]').forEach(function (slider, i) {
    var slides = slider.querySelector('[data-slider-slides]'),
        slidesCount = slides.children.length,
        sliderData = slider.dataset.slider,
        options = sliderOptions[sliderData],
        sliderWidth = slider.offsetWidth,
        slideWidth = slides.children[0].offsetWidth,
        slidesCapacity = Math.round(sliderWidth / slideWidth),
        controls = slider.querySelector('[data-slider-controls]'),
        controlsPrev = controls.querySelector('[data-slider-controls-prev]'),
        controlsNext = controls.querySelector('[data-slider-controls-next]'),
        controlsEndIndex = slidesCount - slidesCapacity,
        adaptive = Number(slider.dataset.sliderAdaptive),
        windowWidth = window.innerWidth,
        progressBar = slider.querySelector('[data-slider-progress]'),
        progressStep = Math.round(100 / (slidesCount - slidesCapacity + 1));

    progressBar.style.width = progressStep + '%';

    if (slidesCount > slidesCapacity) {
      slider.classList.add('slider_initial');
      var flkty = new Flickity(slides, sliderOptions[slider.dataset.slider]);

      if (controls) {
        controlsPrev.addEventListener('click', function (e) {
          e.preventDefault();
          flkty.previous();
        });

        controlsNext.addEventListener('click', function (e) {
          e.preventDefault();
          flkty.next();
        });

        if (flkty.selectedIndex === 0) {
          controlsPrev.disabled = true;
        } else if (flkty.selectedIndex === controlsEndIndex) {
          controlsNext.disabled = true;
        }

        flkty.on('select', function (index) {
          var progressCurrent = parseInt(progressBar.style.left) || 0;

          controlsPrev.disabled = index == 0 ? true : false;
          controlsNext.disabled = index == controlsEndIndex ? true : false;

          progressBar.style.left = progressStep * index + '%';
        });

        flkty.on('change', function (index) {
          if (index >= controlsEndIndex) {
            flkty.select(controlsEndIndex);
          }
        });
      }
    }
  });

  // drop

  document.addEventListener('click', function (e) {
    var drop = document.querySelector('[data-drop-state="1"]');

    if (drop && !e.target.closest('.drop.show') && !e.target.closest('[data-drop-state="1"]')) {
      e.preventDefault();
      drop.click();
    }
  });

  document.querySelectorAll('[data-drop]').forEach(function (drop, i) {
    drop.addEventListener('click', function (e) {
      e.preventDefault();

      var data = drop.dataset.drop,
          dropContent = document.querySelector('[data-drop-content="' + data + '"]'),
          state = Number(drop.dataset.dropState);

      switch (state) {
        case 0:
          dropContent.classList.add('show');
          break;
        case 1:
          dropContent.classList.remove('show');
          break;
      }

      drop.dataset.dropState = Number(!state);
    });

    drop.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        e.target.click();
      }
    });
  });

  // rating

  document.querySelectorAll('.rating').forEach(function (rating, i) {
    var value = Number(rating.querySelector('[data-stars]').dataset.stars);

    rating.querySelectorAll('.star').forEach(function (star, k) {
      if (k < value) {
        star.classList.add('star_fill');
      }
    });
  });

  function prevAll(element) {
    var result = [];

    while (element = element.previousElementSibling) {
      result.push(element);
    }return result;
  }

  function nextAll(element) {
    var result = [];

    while (element = element.nextElementSibling) {
      result.push(element);
    }return result;
  }

  function starFocus(star) {
    star.classList.add('star_hover');

    prevAll(star).forEach(function (el, k) {
      el.classList.add('star_hover');
    });

    nextAll(star).forEach(function (el, k) {
      el.classList.remove('star_hover');
    });
  }

  document.querySelectorAll('.star').forEach(function (star, i) {
    star.addEventListener('mouseenter', function (e) {
      starFocus(star);
    });

    star.addEventListener('focus', function (e) {
      starFocus(star);
    });

    star.addEventListener('mouseleave', function (e) {
      document.querySelectorAll('.star_hover').forEach(function (el, k) {
        el.classList.remove('star_hover');
      });
    });

    star.addEventListener('click', function (e) {
      e.preventDefault();
      star.classList.add('star_fill');

      prevAll(star).forEach(function (el, k) {
        el.classList.add('star_fill');
      });

      nextAll(star).forEach(function (el, k) {
        el.classList.remove('star_fill');
      });
    });

    star.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        star.click();
      }
    });
  });

  // select
  $('select').niceSelect();

  // side adaptive
  document.querySelector('.avatar').addEventListener('click', function (e) {
    if (window.outerWidth <= 768) {
      e.preventDefault();

      document.querySelector('.page__side').classList.toggle('page__side_show');
    }
  });

  // select
  // document.querySelectorAll('select').forEach((select, i) => {
  //   new CustomSelect({
  //     elem: select
  //   });
  // })

  // modals
  // document.querySelectorAll('[data-modal-open]').forEach((trigger, i) => {
  //   trigger.addEventListener('click', (e) => {
  //     e.preventDefault()
  //
  //     const t = e.target.closest('[data-modal-open]'),
  //           data = t.dataset.modalOpen,
  //           modalElement = document.querySelector(`[data-modal="${data}"]`)
  //
  //     let modalContent = modalElement.innerHTML
  //
  //     if (data == 'gallery') {
  //       modalContent = t.innerHTML
  //     }
  //
  //     let modal = new tingle.modal({
  //       closeMethods: ['overlay', 'escape'],
  //       onClose: function() {
  //         this.remove()
  //       },
  //       cssClass: modalElement.classList
  //     });
  //
  //     modal.setContent(modalContent)
  //     modal.open()
  //
  //     const forms = modal.modalBoxContent.querySelectorAll('form')
  //
  //     try {
  //       document.querySelector('.modal__close').addEventListener('click', (e) => {
  //         e.preventDefault()
  //         modal.close()
  //       })
  //     } catch (e) {
  //
  //     }
  //   })
  // })

})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwic2xpZGVyT3B0aW9ucyIsImNlbGxBbGlnbiIsInBhZ2VEb3RzIiwicHJldk5leHRCdXR0b25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNsaWRlciIsImkiLCJzbGlkZXMiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVzQ291bnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNsaWRlckRhdGEiLCJkYXRhc2V0Iiwib3B0aW9ucyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzbGlkZVdpZHRoIiwic2xpZGVzQ2FwYWNpdHkiLCJNYXRoIiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1N0ZXAiLCJzdHlsZSIsIndpZHRoIiwiY2xhc3NMaXN0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4IiwicHJvZ3Jlc3NDdXJyZW50IiwicGFyc2VJbnQiLCJsZWZ0Iiwic2VsZWN0IiwiZHJvcCIsInRhcmdldCIsImNsb3Nlc3QiLCJjbGljayIsImRhdGEiLCJkcm9wQ29udGVudCIsInN0YXRlIiwiZHJvcFN0YXRlIiwicmVtb3ZlIiwia2V5Q29kZSIsInJhdGluZyIsInZhbHVlIiwic3RhcnMiLCJzdGFyIiwiayIsInByZXZBbGwiLCJlbGVtZW50IiwicmVzdWx0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInB1c2giLCJuZXh0QWxsIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwic3RhckZvY3VzIiwiZWwiLCIkIiwibmljZVNlbGVjdCIsIm91dGVyV2lkdGgiLCJ0b2dnbGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxVQUFTQSxJQUFULEVBQWU7O0FBRWQ7QUFDQUM7QUFDQUM7O0FBRUEsTUFBTUMsZ0JBQWdCO0FBQ3BCLGFBQVM7QUFDUEMsaUJBQVcsTUFESjtBQUVQQyxnQkFBVSxLQUZIO0FBR1BDLHVCQUFpQjtBQUhWO0FBRFcsR0FBdEI7O0FBUUFDLFdBQVNDLGdCQUFULENBQTBCLGVBQTFCLEVBQTJDQyxPQUEzQyxDQUFtRCxVQUFDQyxNQUFELEVBQVNDLENBQVQsRUFBZTtBQUNoRSxRQUFNQyxTQUFTRixPQUFPRyxhQUFQLENBQXFCLHNCQUFyQixDQUFmO0FBQUEsUUFDTUMsY0FBY0YsT0FBT0csUUFBUCxDQUFnQkMsTUFEcEM7QUFBQSxRQUVNQyxhQUFhUCxPQUFPUSxPQUFQLENBQWVSLE1BRmxDO0FBQUEsUUFHTVMsVUFBVWhCLGNBQWNjLFVBQWQsQ0FIaEI7QUFBQSxRQUlNRyxjQUFjVixPQUFPVyxXQUozQjtBQUFBLFFBS01DLGFBQWFWLE9BQU9HLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUJNLFdBTHRDO0FBQUEsUUFNTUUsaUJBQWlCQyxLQUFLQyxLQUFMLENBQVdMLGNBQVlFLFVBQXZCLENBTnZCO0FBQUEsUUFPTUksV0FBV2hCLE9BQU9HLGFBQVAsQ0FBcUIsd0JBQXJCLENBUGpCO0FBQUEsUUFRTWMsZUFBZUQsU0FBU2IsYUFBVCxDQUF1Qiw2QkFBdkIsQ0FSckI7QUFBQSxRQVNNZSxlQUFlRixTQUFTYixhQUFULENBQXVCLDZCQUF2QixDQVRyQjtBQUFBLFFBVU1nQixtQkFBbUJmLGNBQWNTLGNBVnZDO0FBQUEsUUFXTU8sV0FBV0MsT0FBT3JCLE9BQU9RLE9BQVAsQ0FBZWMsY0FBdEIsQ0FYakI7QUFBQSxRQVlNQyxjQUFjQyxPQUFPQyxVQVozQjtBQUFBLFFBYU1DLGNBQWMxQixPQUFPRyxh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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdELENBMVBELEVBMFBHbEQsTUExUEgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KClcbiAgc2Nyb2xsVG8oKVxuXG4gIGNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgJ2l0ZW1zJzoge1xuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlcl0nKS5mb3JFYWNoKChzbGlkZXIsIGkpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXNsaWRlc10nKSxcbiAgICAgICAgICBzbGlkZXNDb3VudCA9IHNsaWRlcy5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgc2xpZGVyRGF0YSA9IHNsaWRlci5kYXRhc2V0LnNsaWRlcixcbiAgICAgICAgICBvcHRpb25zID0gc2xpZGVyT3B0aW9uc1tzbGlkZXJEYXRhXSxcbiAgICAgICAgICBzbGlkZXJXaWR0aCA9IHNsaWRlci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJyksXG4gICAgICAgICAgY29udHJvbHNFbmRJbmRleCA9IHNsaWRlc0NvdW50IC0gc2xpZGVzQ2FwYWNpdHksXG4gICAgICAgICAgYWRhcHRpdmUgPSBOdW1iZXIoc2xpZGVyLmRhdGFzZXQuc2xpZGVyQWRhcHRpdmUpLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgcHJvZ3Jlc3NCYXIgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXByb2dyZXNzXScpLFxuICAgICAgICAgIHByb2dyZXNzU3RlcCA9IE1hdGgucm91bmQoMTAwIC8gKHNsaWRlc0NvdW50LXNsaWRlc0NhcGFjaXR5KzEpKVxuXG4gICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc1N0ZXB9JWBcblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2luaXRpYWwnKVxuICAgICAgY29uc3QgZmxrdHkgPSBuZXcgRmxpY2tpdHkoc2xpZGVzLCBzbGlkZXJPcHRpb25zW3NsaWRlci5kYXRhc2V0LnNsaWRlcl0pO1xuXG4gICAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHNQcmV2XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkucHJldmlvdXMoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgICAgfSlcblxuICAgICAgICBpZiAoZmxrdHkuc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgIGNvbnRyb2xzUHJldi5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSBjb250cm9sc0VuZEluZGV4KSB7XG4gICAgICAgICAgY29udHJvbHNOZXh0LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgZmxrdHkub24oJ3NlbGVjdCcsIChpbmRleCkgPT4ge1xuICAgICAgICAgIGxldCBwcm9ncmVzc0N1cnJlbnQgPSBwYXJzZUludChwcm9ncmVzc0Jhci5zdHlsZS5sZWZ0KSB8fCAwXG5cbiAgICAgICAgICBjb250cm9sc1ByZXYuZGlzYWJsZWQgPSAoaW5kZXggPT0gMCkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSAoaW5kZXggPT0gY29udHJvbHNFbmRJbmRleCkgPyB0cnVlIDogZmFsc2VcblxuICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLmxlZnQgPSBgJHtwcm9ncmVzc1N0ZXAqaW5kZXh9JWBcbiAgICAgICAgfSlcblxuICAgICAgICBmbGt0eS5vbignY2hhbmdlJywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID49IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICAgIGZsa3R5LnNlbGVjdChjb250cm9sc0VuZEluZGV4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLy8gZHJvcFxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZHJvcC1zdGF0ZT1cIjFcIl0nKVxuXG4gICAgaWYgKGRyb3AgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJy5kcm9wLnNob3cnKSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZHJvcC1zdGF0ZT1cIjFcIl0nKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBkcm9wLmNsaWNrKClcbiAgICB9XG5cbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wXScpLmZvckVhY2goKGRyb3AsIGkpID0+IHtcbiAgICBkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBkYXRhID0gZHJvcC5kYXRhc2V0LmRyb3AsXG4gICAgICAgICAgICBkcm9wQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3AtY29udGVudD1cIiR7ZGF0YX1cIl1gKSxcbiAgICAgICAgICAgIHN0YXRlID0gTnVtYmVyKGRyb3AuZGF0YXNldC5kcm9wU3RhdGUpXG5cbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGRyb3BDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBkcm9wQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkcm9wLmRhdGFzZXQuZHJvcFN0YXRlID0gTnVtYmVyKCFzdGF0ZSlcblxuICAgIH0pXG5cbiAgICBkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGUudGFyZ2V0LmNsaWNrKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vIHJhdGluZ1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYXRpbmcnKS5mb3JFYWNoKChyYXRpbmcsIGkpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihyYXRpbmcucXVlcnlTZWxlY3RvcignW2RhdGEtc3RhcnNdJykuZGF0YXNldC5zdGFycylcblxuICAgIHJhdGluZy5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpLmZvckVhY2goKHN0YXIsIGspID0+IHtcbiAgICAgIGlmIChrIDwgdmFsdWUpIHtcbiAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdzdGFyX2ZpbGwnKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgZnVuY3Rpb24gcHJldkFsbChlbGVtZW50KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpXG4gICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0QWxsKGVsZW1lbnQpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgICByZXN1bHQucHVzaChlbGVtZW50KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhckZvY3VzKHN0YXIpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ3N0YXJfaG92ZXInKVxuXG4gICAgcHJldkFsbChzdGFyKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc3Rhcl9ob3ZlcicpXG4gICAgfSlcblxuICAgIG5leHRBbGwoc3RhcikuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJfaG92ZXInKVxuICAgIH0pXG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpLmZvckVhY2goKHN0YXIsIGkpID0+IHtcbiAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgc3RhckZvY3VzKHN0YXIpXG4gICAgfSlcblxuICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xuICAgICAgc3RhckZvY3VzKHN0YXIpXG4gICAgfSlcblxuICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3Rhcl9ob3ZlcicpLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJfaG92ZXInKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnc3Rhcl9maWxsJylcblxuICAgICAgcHJldkFsbChzdGFyKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzdGFyX2ZpbGwnKVxuICAgICAgfSlcblxuICAgICAgbmV4dEFsbChzdGFyKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzdGFyX2ZpbGwnKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBzdGFyLmNsaWNrKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vIHNlbGVjdFxuICAkKCdzZWxlY3QnKS5uaWNlU2VsZWN0KCk7XG5cbiAgLy8gc2lkZSBhZGFwdGl2ZVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXZhdGFyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICh3aW5kb3cub3V0ZXJXaWR0aCA8PSA3NjgpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2VfX3NpZGUnKS5jbGFzc0xpc3QudG9nZ2xlKCdwYWdlX19zaWRlX3Nob3cnKVxuICAgIH1cbiAgfSlcblxuICAvLyBzZWxlY3RcbiAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gIC8vICAgbmV3IEN1c3RvbVNlbGVjdCh7XG4gIC8vICAgICBlbGVtOiBzZWxlY3RcbiAgLy8gICB9KTtcbiAgLy8gfSlcblxuICAvLyBtb2RhbHNcbiAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtb3Blbl0nKS5mb3JFYWNoKCh0cmlnZ2VyLCBpKSA9PiB7XG4gIC8vICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIC8vICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgLy9cbiAgLy8gICAgIGNvbnN0IHQgPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1tb2RhbC1vcGVuXScpLFxuICAvLyAgICAgICAgICAgZGF0YSA9IHQuZGF0YXNldC5tb2RhbE9wZW4sXG4gIC8vICAgICAgICAgICBtb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1tb2RhbD1cIiR7ZGF0YX1cIl1gKVxuICAvL1xuICAvLyAgICAgbGV0IG1vZGFsQ29udGVudCA9IG1vZGFsRWxlbWVudC5pbm5lckhUTUxcbiAgLy9cbiAgLy8gICAgIGlmIChkYXRhID09ICdnYWxsZXJ5Jykge1xuICAvLyAgICAgICBtb2RhbENvbnRlbnQgPSB0LmlubmVySFRNTFxuICAvLyAgICAgfVxuICAvL1xuICAvLyAgICAgbGV0IG1vZGFsID0gbmV3IHRpbmdsZS5tb2RhbCh7XG4gIC8vICAgICAgIGNsb3NlTWV0aG9kczogWydvdmVybGF5JywgJ2VzY2FwZSddLFxuICAvLyAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcbiAgLy8gICAgICAgICB0aGlzLnJlbW92ZSgpXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIGNzc0NsYXNzOiBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0XG4gIC8vICAgICB9KTtcbiAgLy9cbiAgLy8gICAgIG1vZGFsLnNldENvbnRlbnQobW9kYWxDb250ZW50KVxuICAvLyAgICAgbW9kYWwub3BlbigpXG4gIC8vXG4gIC8vICAgICBjb25zdCBmb3JtcyA9IG1vZGFsLm1vZGFsQm94Q29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJylcbiAgLy9cbiAgLy8gICAgIHRyeSB7XG4gIC8vICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIC8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vICAgICAgICAgbW9kYWwuY2xvc2UoKVxuICAvLyAgICAgICB9KVxuICAvLyAgICAgfSBjYXRjaCAoZSkge1xuICAvL1xuICAvLyAgICAgfVxuICAvLyAgIH0pXG4gIC8vIH0pXG5cblxufSkod2luZG93KTtcbiJdfQ==
