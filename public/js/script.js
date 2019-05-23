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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwic2xpZGVyT3B0aW9ucyIsImNlbGxBbGlnbiIsInBhZ2VEb3RzIiwicHJldk5leHRCdXR0b25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNsaWRlciIsImkiLCJzbGlkZXMiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVzQ291bnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNsaWRlckRhdGEiLCJkYXRhc2V0Iiwib3B0aW9ucyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzbGlkZVdpZHRoIiwic2xpZGVzQ2FwYWNpdHkiLCJNYXRoIiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1N0ZXAiLCJzdHlsZSIsIndpZHRoIiwiY2xhc3NMaXN0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4IiwicHJvZ3Jlc3NDdXJyZW50IiwicGFyc2VJbnQiLCJsZWZ0Iiwic2VsZWN0IiwiZHJvcCIsInRhcmdldCIsImNsb3Nlc3QiLCJjbGljayIsImRhdGEiLCJkcm9wQ29udGVudCIsInN0YXRlIiwiZHJvcFN0YXRlIiwicmVtb3ZlIiwia2V5Q29kZSIsInJhdGluZyIsInZhbHVlIiwic3RhcnMiLCJzdGFyIiwiayIsInByZXZBbGwiLCJlbGVtZW50IiwicmVzdWx0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInB1c2giLCJuZXh0QWxsIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwic3RhckZvY3VzIiwiZWwiLCIkIiwibmljZVNlbGVjdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFVBQVNBLElBQVQsRUFBZTs7QUFFZDtBQUNBQztBQUNBQzs7QUFFQSxNQUFNQyxnQkFBZ0I7QUFDcEIsYUFBUztBQUNQQyxpQkFBVyxNQURKO0FBRVBDLGdCQUFVLEtBRkg7QUFHUEMsdUJBQWlCO0FBSFY7QUFEVyxHQUF0Qjs7QUFRQUMsV0FBU0MsZ0JBQVQsQ0FBMEIsZUFBMUIsRUFBMkNDLE9BQTNDLENBQW1ELFVBQUNDLE1BQUQsRUFBU0MsQ0FBVCxFQUFlO0FBQ2hFLFFBQU1DLFNBQVNGLE9BQU9HLGFBQVAsQ0FBcUIsc0JBQXJCLENBQWY7QUFBQSxRQUNNQyxjQUFjRixPQUFPRyxRQUFQLENBQWdCQyxNQURwQztBQUFBLFFBRU1DLGFBQWFQLE9BQU9RLE9BQVAsQ0FBZVIsTUFGbEM7QUFBQSxRQUdNUyxVQUFVaEIsY0FBY2MsVUFBZCxDQUhoQjtBQUFBLFFBSU1HLGNBQWNWLE9BQU9XLFdBSjNCO0FBQUEsUUFLTUMsYUFBYVYsT0FBT0csUUFBUCxDQUFnQixDQUFoQixFQUFtQk0sV0FMdEM7QUFBQSxRQU1NRSxpQkFBaUJDLEtBQUtDLEtBQUwsQ0FBV0wsY0FBWUUsVUFBdkIsQ0FOdkI7QUFBQSxRQU9NSSxXQUFXaEIsT0FBT0csYUFBUCxDQUFxQix3QkFBckIsQ0FQakI7QUFBQSxRQVFNYyxlQUFlRCxTQUFTYixhQUFULENBQXVCLDZCQUF2QixDQVJyQjtBQUFBLFFBU01lLGVBQWVGLFNBQVNiLGFBQVQsQ0FBdUIsNkJBQXZCLENBVHJCO0FBQUEsUUFVTWdCLG1CQUFtQmYsY0FBY1MsY0FWdkM7QUFBQSxRQVdNTyxXQUFXQyxPQUFPckIsT0FBT1EsT0FBUCxDQUFlYyxjQUF0QixDQVhqQjtBQUFBLFFBWU1DLGNBQWNDLE9BQU9DLFVBWjNCO0FBQUEsUUFhTUMsY0FBYzFCLE9BQU9HLGFBQVAsQ0FBcUIsd0JBQXJCLENBYnBC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QW5COztBQUVBK0IsY0FBUUYsSUFBUixFQUFjN0QsT0FBZCxDQUFzQixVQUFDdUUsRUFBRCxFQUFLVCxDQUFMLEVBQVc7QUFDL0JTLFdBQUd4QyxTQUFILENBQWFDLEdBQWIsQ0FBaUIsV0FBakI7QUFDRCxPQUZEOztBQUlBb0MsY0FBUVAsSUFBUixFQUFjN0QsT0FBZCxDQUFzQixVQUFDdUUsRUFBRCxFQUFLVCxDQUFMLEVBQVc7QUFDL0JTLFdBQUd4QyxTQUFILENBQWF5QixNQUFiLENBQW9CLFdBQXBCO0FBQ0QsT0FGRDtBQUdELEtBWEQ7O0FBYUFLLFNBQUsxQixnQkFBTCxDQUFzQixTQUF0QixFQUFpQyxVQUFDQyxDQUFELEVBQU87QUFDdEMsVUFBSUEsRUFBRXFCLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQnJCLFVBQUVDLGNBQUY7QUFDQXdCLGFBQUtWLEtBQUw7QUFDRDtBQUNGLEtBTEQ7QUFNRCxHQWxDRDs7QUFvQ0E7QUFDQXFCLElBQUUsUUFBRixFQUFZQyxVQUFaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdELENBalBELEVBaVBHaEQsTUFqUEgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KClcbiAgc2Nyb2xsVG8oKVxuXG4gIGNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgJ2l0ZW1zJzoge1xuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlcl0nKS5mb3JFYWNoKChzbGlkZXIsIGkpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXNsaWRlc10nKSxcbiAgICAgICAgICBzbGlkZXNDb3VudCA9IHNsaWRlcy5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgc2xpZGVyRGF0YSA9IHNsaWRlci5kYXRhc2V0LnNsaWRlcixcbiAgICAgICAgICBvcHRpb25zID0gc2xpZGVyT3B0aW9uc1tzbGlkZXJEYXRhXSxcbiAgICAgICAgICBzbGlkZXJXaWR0aCA9IHNsaWRlci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJyksXG4gICAgICAgICAgY29udHJvbHNFbmRJbmRleCA9IHNsaWRlc0NvdW50IC0gc2xpZGVzQ2FwYWNpdHksXG4gICAgICAgICAgYWRhcHRpdmUgPSBOdW1iZXIoc2xpZGVyLmRhdGFzZXQuc2xpZGVyQWRhcHRpdmUpLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgcHJvZ3Jlc3NCYXIgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXByb2dyZXNzXScpLFxuICAgICAgICAgIHByb2dyZXNzU3RlcCA9IE1hdGgucm91bmQoMTAwIC8gKHNsaWRlc0NvdW50LXNsaWRlc0NhcGFjaXR5KzEpKVxuXG4gICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc1N0ZXB9JWBcblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2luaXRpYWwnKVxuICAgICAgY29uc3QgZmxrdHkgPSBuZXcgRmxpY2tpdHkoc2xpZGVzLCBzbGlkZXJPcHRpb25zW3NsaWRlci5kYXRhc2V0LnNsaWRlcl0pO1xuXG4gICAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHNQcmV2XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkucHJldmlvdXMoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgICAgfSlcblxuICAgICAgICBpZiAoZmxrdHkuc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgIGNvbnRyb2xzUHJldi5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSBjb250cm9sc0VuZEluZGV4KSB7XG4gICAgICAgICAgY29udHJvbHNOZXh0LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgZmxrdHkub24oJ3NlbGVjdCcsIChpbmRleCkgPT4ge1xuICAgICAgICAgIGxldCBwcm9ncmVzc0N1cnJlbnQgPSBwYXJzZUludChwcm9ncmVzc0Jhci5zdHlsZS5sZWZ0KSB8fCAwXG5cbiAgICAgICAgICBjb250cm9sc1ByZXYuZGlzYWJsZWQgPSAoaW5kZXggPT0gMCkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSAoaW5kZXggPT0gY29udHJvbHNFbmRJbmRleCkgPyB0cnVlIDogZmFsc2VcblxuICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLmxlZnQgPSBgJHtwcm9ncmVzc1N0ZXAqaW5kZXh9JWBcbiAgICAgICAgfSlcblxuICAgICAgICBmbGt0eS5vbignY2hhbmdlJywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID49IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICAgIGZsa3R5LnNlbGVjdChjb250cm9sc0VuZEluZGV4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLy8gZHJvcFxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZHJvcC1zdGF0ZT1cIjFcIl0nKVxuXG4gICAgaWYgKGRyb3AgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJy5kcm9wLnNob3cnKSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZHJvcC1zdGF0ZT1cIjFcIl0nKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBkcm9wLmNsaWNrKClcbiAgICB9XG5cbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wXScpLmZvckVhY2goKGRyb3AsIGkpID0+IHtcbiAgICBkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBkYXRhID0gZHJvcC5kYXRhc2V0LmRyb3AsXG4gICAgICAgICAgICBkcm9wQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3AtY29udGVudD1cIiR7ZGF0YX1cIl1gKSxcbiAgICAgICAgICAgIHN0YXRlID0gTnVtYmVyKGRyb3AuZGF0YXNldC5kcm9wU3RhdGUpXG5cbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGRyb3BDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBkcm9wQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkcm9wLmRhdGFzZXQuZHJvcFN0YXRlID0gTnVtYmVyKCFzdGF0ZSlcblxuICAgIH0pXG5cbiAgICBkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGUudGFyZ2V0LmNsaWNrKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vIHJhdGluZ1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYXRpbmcnKS5mb3JFYWNoKChyYXRpbmcsIGkpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihyYXRpbmcucXVlcnlTZWxlY3RvcignW2RhdGEtc3RhcnNdJykuZGF0YXNldC5zdGFycylcblxuICAgIHJhdGluZy5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpLmZvckVhY2goKHN0YXIsIGspID0+IHtcbiAgICAgIGlmIChrIDwgdmFsdWUpIHtcbiAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdzdGFyX2ZpbGwnKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgZnVuY3Rpb24gcHJldkFsbChlbGVtZW50KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpXG4gICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0QWxsKGVsZW1lbnQpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgICByZXN1bHQucHVzaChlbGVtZW50KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhckZvY3VzKHN0YXIpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ3N0YXJfaG92ZXInKVxuXG4gICAgcHJldkFsbChzdGFyKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc3Rhcl9ob3ZlcicpXG4gICAgfSlcblxuICAgIG5leHRBbGwoc3RhcikuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJfaG92ZXInKVxuICAgIH0pXG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpLmZvckVhY2goKHN0YXIsIGkpID0+IHtcbiAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgc3RhckZvY3VzKHN0YXIpXG4gICAgfSlcblxuICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xuICAgICAgc3RhckZvY3VzKHN0YXIpXG4gICAgfSlcblxuICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3Rhcl9ob3ZlcicpLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJfaG92ZXInKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnc3Rhcl9maWxsJylcblxuICAgICAgcHJldkFsbChzdGFyKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzdGFyX2ZpbGwnKVxuICAgICAgfSlcblxuICAgICAgbmV4dEFsbChzdGFyKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzdGFyX2ZpbGwnKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBzdGFyLmNsaWNrKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vIHNlbGVjdFxuICAkKCdzZWxlY3QnKS5uaWNlU2VsZWN0KCk7XG5cbiAgLy8gc2VsZWN0XG4gIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuICAvLyAgIG5ldyBDdXN0b21TZWxlY3Qoe1xuICAvLyAgICAgZWxlbTogc2VsZWN0XG4gIC8vICAgfSk7XG4gIC8vIH0pXG5cbiAgLy8gbW9kYWxzXG4gIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLW9wZW5dJykuZm9yRWFjaCgodHJpZ2dlciwgaSkgPT4ge1xuICAvLyAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAvLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vICAgICBjb25zdCB0ID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtbW9kYWwtb3Blbl0nKSxcbiAgLy8gICAgICAgICAgIGRhdGEgPSB0LmRhdGFzZXQubW9kYWxPcGVuLFxuICAvLyAgICAgICAgICAgbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYClcbiAgLy9cbiAgLy8gICAgIGxldCBtb2RhbENvbnRlbnQgPSBtb2RhbEVsZW1lbnQuaW5uZXJIVE1MXG4gIC8vXG4gIC8vICAgICBpZiAoZGF0YSA9PSAnZ2FsbGVyeScpIHtcbiAgLy8gICAgICAgbW9kYWxDb250ZW50ID0gdC5pbm5lckhUTUxcbiAgLy8gICAgIH1cbiAgLy9cbiAgLy8gICAgIGxldCBtb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAvLyAgICAgICBjbG9zZU1ldGhvZHM6IFsnb3ZlcmxheScsICdlc2NhcGUnXSxcbiAgLy8gICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gIC8vICAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAvLyAgICAgICB9LFxuICAvLyAgICAgICBjc3NDbGFzczogbW9kYWxFbGVtZW50LmNsYXNzTGlzdFxuICAvLyAgICAgfSk7XG4gIC8vXG4gIC8vICAgICBtb2RhbC5zZXRDb250ZW50KG1vZGFsQ29udGVudClcbiAgLy8gICAgIG1vZGFsLm9wZW4oKVxuICAvL1xuICAvLyAgICAgY29uc3QgZm9ybXMgPSBtb2RhbC5tb2RhbEJveENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpXG4gIC8vXG4gIC8vICAgICB0cnkge1xuICAvLyAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAvLyAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAvLyAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgIH0gY2F0Y2ggKGUpIHtcbiAgLy9cbiAgLy8gICAgIH1cbiAgLy8gICB9KVxuICAvLyB9KVxuXG5cbn0pKHdpbmRvdyk7XG4iXX0=
