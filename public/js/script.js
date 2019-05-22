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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwic2xpZGVyT3B0aW9ucyIsImNlbGxBbGlnbiIsInBhZ2VEb3RzIiwicHJldk5leHRCdXR0b25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNsaWRlciIsImkiLCJzbGlkZXMiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVzQ291bnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNsaWRlckRhdGEiLCJkYXRhc2V0Iiwib3B0aW9ucyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzbGlkZVdpZHRoIiwic2xpZGVzQ2FwYWNpdHkiLCJNYXRoIiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1N0ZXAiLCJzdHlsZSIsIndpZHRoIiwiY2xhc3NMaXN0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4IiwicHJvZ3Jlc3NDdXJyZW50IiwicGFyc2VJbnQiLCJsZWZ0Iiwic2VsZWN0IiwiZHJvcCIsInRhcmdldCIsImNsb3Nlc3QiLCJjbGljayIsImRhdGEiLCJkcm9wQ29udGVudCIsInN0YXRlIiwiZHJvcFN0YXRlIiwicmVtb3ZlIiwia2V5Q29kZSIsInJhdGluZyIsInZhbHVlIiwic3RhcnMiLCJzdGFyIiwiayIsInByZXZBbGwiLCJlbGVtZW50IiwicmVzdWx0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInB1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LElBQVIsRUFBYzdELE9BQWQsQ0FBc0IsVUFBQ3VFLEVBQUQsRUFBS1QsQ0FBTCxFQUFXO0FBQy9CUyxXQUFHeEMsU0FBSCxDQUFhQyxHQUFiLENBQWlCLFdBQWpCO0FBQ0QsT0FGRDs7QUFJQW9DLGNBQVFQLElBQVIsRUFBYzdELE9BQWQsQ0FBc0IsVUFBQ3VFLEVBQUQsRUFBS1QsQ0FBTCxFQUFXO0FBQy9CUyxXQUFHeEMsU0FBSCxDQUFheUIsTUFBYixDQUFvQixXQUFwQjtBQUNELE9BRkQ7QUFHRCxLQVhEOztBQWFBSyxTQUFLMUIsZ0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3RDLFVBQUlBLEVBQUVxQixPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEJyQixVQUFFQyxjQUFGO0FBQ0F3QixhQUFLVixLQUFMO0FBQ0Q7QUFDRixLQUxEO0FBTUQsR0FsQ0Q7O0FBb0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0QsQ0F2T0QsRUF1T0cxQixNQXZPSCIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24ocm9vdCkge1xuXG4gIC8vIHN2ZyBmb3IgYWxsXG4gIHN2ZzRldmVyeWJvZHkoKVxuICBzY3JvbGxUbygpXG5cbiAgY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcbiAgICAnaXRlbXMnOiB7XG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIHBhZ2VEb3RzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyXScpLmZvckVhY2goKHNsaWRlciwgaSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItc2xpZGVzXScpLFxuICAgICAgICAgIHNsaWRlc0NvdW50ID0gc2xpZGVzLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICBzbGlkZXJEYXRhID0gc2xpZGVyLmRhdGFzZXQuc2xpZGVyLFxuICAgICAgICAgIG9wdGlvbnMgPSBzbGlkZXJPcHRpb25zW3NsaWRlckRhdGFdLFxuICAgICAgICAgIHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlV2lkdGggPSBzbGlkZXMuY2hpbGRyZW5bMF0ub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgc2xpZGVzQ2FwYWNpdHkgPSBNYXRoLnJvdW5kKHNsaWRlcldpZHRoL3NsaWRlV2lkdGgpLFxuICAgICAgICAgIGNvbnRyb2xzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9sc10nKSxcbiAgICAgICAgICBjb250cm9sc1ByZXYgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtcHJldl0nKSxcbiAgICAgICAgICBjb250cm9sc05leHQgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtbmV4dF0nKSxcbiAgICAgICAgICBjb250cm9sc0VuZEluZGV4ID0gc2xpZGVzQ291bnQgLSBzbGlkZXNDYXBhY2l0eSxcbiAgICAgICAgICBhZGFwdGl2ZSA9IE51bWJlcihzbGlkZXIuZGF0YXNldC5zbGlkZXJBZGFwdGl2ZSksXG4gICAgICAgICAgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICBwcm9ncmVzc0JhciA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItcHJvZ3Jlc3NdJyksXG4gICAgICAgICAgcHJvZ3Jlc3NTdGVwID0gTWF0aC5yb3VuZCgxMDAgLyAoc2xpZGVzQ291bnQtc2xpZGVzQ2FwYWNpdHkrMSkpXG5cbiAgICBwcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IGAke3Byb2dyZXNzU3RlcH0lYFxuXG4gICAgaWYgKHNsaWRlc0NvdW50ID4gc2xpZGVzQ2FwYWNpdHkpIHtcbiAgICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaW5pdGlhbCcpXG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXSk7XG5cbiAgICAgIGlmIChjb250cm9scykge1xuICAgICAgICBjb250cm9sc1ByZXZcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5wcmV2aW91cygpXG4gICAgICAgICAgfSlcblxuICAgICAgICBjb250cm9sc05leHRcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5uZXh0KClcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgY29udHJvbHNQcmV2LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGZsa3R5LnNlbGVjdGVkSW5kZXggPT09IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBmbGt0eS5vbignc2VsZWN0JywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IHByb2dyZXNzQ3VycmVudCA9IHBhcnNlSW50KHByb2dyZXNzQmFyLnN0eWxlLmxlZnQpIHx8IDBcblxuICAgICAgICAgIGNvbnRyb2xzUHJldi5kaXNhYmxlZCA9IChpbmRleCA9PSAwKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgIGNvbnRyb2xzTmV4dC5kaXNhYmxlZCA9IChpbmRleCA9PSBjb250cm9sc0VuZEluZGV4KSA/IHRydWUgOiBmYWxzZVxuXG4gICAgICAgICAgcHJvZ3Jlc3NCYXIuc3R5bGUubGVmdCA9IGAke3Byb2dyZXNzU3RlcCppbmRleH0lYFxuICAgICAgICB9KVxuXG4gICAgICAgIGZsa3R5Lm9uKCdjaGFuZ2UnLCAoaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPj0gY29udHJvbHNFbmRJbmRleCkge1xuICAgICAgICAgICAgZmxrdHkuc2VsZWN0KGNvbnRyb2xzRW5kSW5kZXgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvLyBkcm9wXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IGRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kcm9wLXN0YXRlPVwiMVwiXScpXG5cbiAgICBpZiAoZHJvcCAmJiAhZS50YXJnZXQuY2xvc2VzdCgnLmRyb3Auc2hvdycpICYmICFlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1kcm9wLXN0YXRlPVwiMVwiXScpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGRyb3AuY2xpY2soKVxuICAgIH1cblxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3BdJykuZm9yRWFjaCgoZHJvcCwgaSkgPT4ge1xuICAgIGRyb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGRhdGEgPSBkcm9wLmRhdGFzZXQuZHJvcCxcbiAgICAgICAgICAgIGRyb3BDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcC1jb250ZW50PVwiJHtkYXRhfVwiXWApLFxuICAgICAgICAgICAgc3RhdGUgPSBOdW1iZXIoZHJvcC5kYXRhc2V0LmRyb3BTdGF0ZSlcblxuICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgZHJvcENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGRyb3BDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRyb3AuZGF0YXNldC5kcm9wU3RhdGUgPSBOdW1iZXIoIXN0YXRlKVxuXG4gICAgfSlcblxuICAgIGRyb3AuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZS50YXJnZXQuY2xpY2soKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gcmF0aW5nXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJhdGluZycpLmZvckVhY2goKHJhdGluZywgaSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gTnVtYmVyKHJhdGluZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdGFyc10nKS5kYXRhc2V0LnN0YXJzKVxuXG4gICAgcmF0aW5nLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyJykuZm9yRWFjaCgoc3RhciwgaykgPT4ge1xuICAgICAgaWYgKGsgPCB2YWx1ZSkge1xuICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ3N0YXJfZmlsbCcpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICBmdW5jdGlvbiBwcmV2QWxsKGVsZW1lbnQpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZylcbiAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRBbGwoZWxlbWVudCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpXG4gICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFyRm9jdXMoc3Rhcikge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnc3Rhcl9ob3ZlcicpXG5cbiAgICBwcmV2QWxsKHN0YXIpLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzdGFyX2hvdmVyJylcbiAgICB9KVxuXG4gICAgbmV4dEFsbChzdGFyKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc3Rhcl9ob3ZlcicpXG4gICAgfSlcbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyJykuZm9yRWFjaCgoc3RhciwgaSkgPT4ge1xuICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICBzdGFyRm9jdXMoc3RhcilcbiAgICB9KVxuXG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB7XG4gICAgICBzdGFyRm9jdXMoc3RhcilcbiAgICB9KVxuXG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGUpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyX2hvdmVyJykuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc3Rhcl9ob3ZlcicpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdzdGFyX2ZpbGwnKVxuXG4gICAgICBwcmV2QWxsKHN0YXIpLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3N0YXJfZmlsbCcpXG4gICAgICB9KVxuXG4gICAgICBuZXh0QWxsKHN0YXIpLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJfZmlsbCcpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHN0YXIuY2xpY2soKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gbW9kYWxzXG4gIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLW9wZW5dJykuZm9yRWFjaCgodHJpZ2dlciwgaSkgPT4ge1xuICAvLyAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAvLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vICAgICBjb25zdCB0ID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtbW9kYWwtb3Blbl0nKSxcbiAgLy8gICAgICAgICAgIGRhdGEgPSB0LmRhdGFzZXQubW9kYWxPcGVuLFxuICAvLyAgICAgICAgICAgbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYClcbiAgLy9cbiAgLy8gICAgIGxldCBtb2RhbENvbnRlbnQgPSBtb2RhbEVsZW1lbnQuaW5uZXJIVE1MXG4gIC8vXG4gIC8vICAgICBpZiAoZGF0YSA9PSAnZ2FsbGVyeScpIHtcbiAgLy8gICAgICAgbW9kYWxDb250ZW50ID0gdC5pbm5lckhUTUxcbiAgLy8gICAgIH1cbiAgLy9cbiAgLy8gICAgIGxldCBtb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAvLyAgICAgICBjbG9zZU1ldGhvZHM6IFsnb3ZlcmxheScsICdlc2NhcGUnXSxcbiAgLy8gICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gIC8vICAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAvLyAgICAgICB9LFxuICAvLyAgICAgICBjc3NDbGFzczogbW9kYWxFbGVtZW50LmNsYXNzTGlzdFxuICAvLyAgICAgfSk7XG4gIC8vXG4gIC8vICAgICBtb2RhbC5zZXRDb250ZW50KG1vZGFsQ29udGVudClcbiAgLy8gICAgIG1vZGFsLm9wZW4oKVxuICAvL1xuICAvLyAgICAgY29uc3QgZm9ybXMgPSBtb2RhbC5tb2RhbEJveENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpXG4gIC8vXG4gIC8vICAgICB0cnkge1xuICAvLyAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAvLyAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAvLyAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgIH0gY2F0Y2ggKGUpIHtcbiAgLy9cbiAgLy8gICAgIH1cbiAgLy8gICB9KVxuICAvLyB9KVxuXG5cbn0pKHdpbmRvdyk7XG4iXX0=
