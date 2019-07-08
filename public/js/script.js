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
    },
    'team': {
      cellAlign: 'center',
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
        progressBar = slider.querySelector('[data-slider-progress]');

    var progressStep = void 0;

    if (progressBar) {
      progressStep = Math.round(100 / (slidesCount - slidesCapacity + 1));

      progressBar.style.width = progressStep + '%';
    }

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
          if (progressBar) {
            var progressCurrent = parseInt(progressBar.style.left) || 0;
            progressBar.style.left = progressStep * index + '%';
          }

          controlsPrev.disabled = index == 0 ? true : false;
          controlsNext.disabled = index == controlsEndIndex ? true : false;
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
  var avatar = document.querySelector('.avatar');

  if (avatar) {
    avatar.addEventListener('click', function (e) {
      if (window.outerWidth <= 768) {
        e.preventDefault();

        document.querySelector('.page__side').classList.toggle('page__side_show');
      }
    });
  }

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

  // modals

  $('[data-modal-type="modal"]').iziModal();

  $('[data-modal-open]').on('click', function (e) {
    e.preventDefault();

    var data = $(this).data('modal-open'),
        modal = $('[data-modal="' + data + '"]'),
        type = $(modal).data('modal-type');

    switch (type) {
      case 'video':
        var urlVideo = $(this).attr('href');

        $(modal).iziModal({
          iframe: true,
          overlayColor: 'rgba(0, 0, 0, 0.9)',
          iframeURL: urlVideo
        });

        $(modal).iziModal('open');

        break;
      default:
        $(modal).iziModal('open');

    }
  });
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwic2xpZGVyT3B0aW9ucyIsImNlbGxBbGlnbiIsInBhZ2VEb3RzIiwicHJldk5leHRCdXR0b25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNsaWRlciIsImkiLCJzbGlkZXMiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVzQ291bnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNsaWRlckRhdGEiLCJkYXRhc2V0Iiwib3B0aW9ucyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzbGlkZVdpZHRoIiwic2xpZGVzQ2FwYWNpdHkiLCJNYXRoIiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1N0ZXAiLCJzdHlsZSIsIndpZHRoIiwiY2xhc3NMaXN0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4IiwicHJvZ3Jlc3NDdXJyZW50IiwicGFyc2VJbnQiLCJsZWZ0Iiwic2VsZWN0IiwiZHJvcCIsInRhcmdldCIsImNsb3Nlc3QiLCJjbGljayIsImRhdGEiLCJkcm9wQ29udGVudCIsInN0YXRlIiwiZHJvcFN0YXRlIiwicmVtb3ZlIiwia2V5Q29kZSIsInJhdGluZyIsInZhbHVlIiwic3RhcnMiLCJzdGFyIiwiayIsInByZXZBbGwiLCJlbGVtZW50IiwicmVzdWx0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInB1c2giLCJuZXh0QWxsIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwic3RhckZvY3VzIiwiZWwiLCIkIiwibmljZVNlbGVjdCIsImF2YXRhciIsIm91dGVyV2lkdGgiLCJ0b2dnbGUiLCJpemlNb2RhbCIsIm1vZGFsIiwidHlwZSIsInVybFZpZGVvIiwiYXR0ciIsImlmcmFtZSIsIm92ZXJsYXlDb2xvciIsImlmcmFtZVVSTCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFVBQVNBLElBQVQsRUFBZTs7QUFFZDtBQUNBQztBQUNBQzs7QUFFQSxNQUFNQyxnQkFBZ0I7QUFDcEIsYUFBUztBQUNQQyxpQkFBVyxNQURKO0FBRVBDLGdCQUFVLEtBRkg7QUFHUEMsdUJBQWlCO0FBSFYsS0FEVztBQU1wQixZQUFRO0FBQ05GLGlCQUFXLFFBREw7QUFFTkMsZ0JBQVUsS0FGSjtBQUdOQyx1QkFBaUI7QUFIWDtBQU5ZLEdBQXRCOztBQWFBQyxXQUFTQyxnQkFBVCxDQUEwQixlQUExQixFQUEyQ0MsT0FBM0MsQ0FBbUQsVUFBQ0MsTUFBRCxFQUFTQyxDQUFULEVBQWU7QUFDaEUsUUFBTUMsU0FBU0YsT0FBT0csYUFBUCxDQUFxQixzQkFBckIsQ0FBZjtBQUFBLFFBQ01DLGNBQWNGLE9BQU9HLFFBQVAsQ0FBZ0JDLE1BRHBDO0FBQUEsUUFFTUMsYUFBYVAsT0FBT1EsT0FBUCxDQUFlUixNQUZsQztBQUFBLFFBR01TLFVBQVVoQixjQUFjYyxVQUFkLENBSGhCO0FBQUEsUUFJTUcsY0FBY1YsT0FBT1csV0FKM0I7QUFBQSxRQUtNQyxhQUFhVixPQUFPRyxRQUFQLENBQWdCLENBQWhCLEVBQW1CTSxXQUx0QztBQUFBLFFBTU1FLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXTCxjQUFZRSxVQUF2QixDQU52QjtBQUFBLFFBT01JLFdBQVdoQixPQUFPRyxhQUFQLENBQXFCLHdCQUFyQixDQVBqQjtBQUFBLFFBUU1jLGVBQWVELFNBQVNiLGFBQVQsQ0FBdUIsNkJBQXZCLENBUnJCO0FBQUEsUUFTTWUsZUFBZUYsU0FBU2IsYUFBVCxD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c3ZnIGZvciBhbGxcbiAgc3ZnNGV2ZXJ5Ym9keSgpXG4gIHNjcm9sbFRvKClcblxuICBjb25zdCBzbGlkZXJPcHRpb25zID0ge1xuICAgICdpdGVtcyc6IHtcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICB9LFxuICAgICd0ZWFtJzoge1xuICAgICAgY2VsbEFsaWduOiAnY2VudGVyJyxcbiAgICAgIHBhZ2VEb3RzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyXScpLmZvckVhY2goKHNsaWRlciwgaSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItc2xpZGVzXScpLFxuICAgICAgICAgIHNsaWRlc0NvdW50ID0gc2xpZGVzLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICBzbGlkZXJEYXRhID0gc2xpZGVyLmRhdGFzZXQuc2xpZGVyLFxuICAgICAgICAgIG9wdGlvbnMgPSBzbGlkZXJPcHRpb25zW3NsaWRlckRhdGFdLFxuICAgICAgICAgIHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlV2lkdGggPSBzbGlkZXMuY2hpbGRyZW5bMF0ub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgc2xpZGVzQ2FwYWNpdHkgPSBNYXRoLnJvdW5kKHNsaWRlcldpZHRoL3NsaWRlV2lkdGgpLFxuICAgICAgICAgIGNvbnRyb2xzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9sc10nKSxcbiAgICAgICAgICBjb250cm9sc1ByZXYgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtcHJldl0nKSxcbiAgICAgICAgICBjb250cm9sc05leHQgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtbmV4dF0nKSxcbiAgICAgICAgICBjb250cm9sc0VuZEluZGV4ID0gc2xpZGVzQ291bnQgLSBzbGlkZXNDYXBhY2l0eSxcbiAgICAgICAgICBhZGFwdGl2ZSA9IE51bWJlcihzbGlkZXIuZGF0YXNldC5zbGlkZXJBZGFwdGl2ZSksXG4gICAgICAgICAgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICBwcm9ncmVzc0JhciA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItcHJvZ3Jlc3NdJylcblxuICAgIGxldCBwcm9ncmVzc1N0ZXBcblxuICAgIGlmIChwcm9ncmVzc0Jhcikge1xuICAgICAgcHJvZ3Jlc3NTdGVwID0gTWF0aC5yb3VuZCgxMDAgLyAoc2xpZGVzQ291bnQtc2xpZGVzQ2FwYWNpdHkrMSkpXG5cbiAgICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gYCR7cHJvZ3Jlc3NTdGVwfSVgXG4gICAgfVxuXG4gICAgaWYgKHNsaWRlc0NvdW50ID4gc2xpZGVzQ2FwYWNpdHkpIHtcbiAgICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaW5pdGlhbCcpXG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXSk7XG5cbiAgICAgIGlmIChjb250cm9scykge1xuICAgICAgICBjb250cm9sc1ByZXZcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5wcmV2aW91cygpXG4gICAgICAgICAgfSlcblxuICAgICAgICBjb250cm9sc05leHRcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5uZXh0KClcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgY29udHJvbHNQcmV2LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGZsa3R5LnNlbGVjdGVkSW5kZXggPT09IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBmbGt0eS5vbignc2VsZWN0JywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NDdXJyZW50ID0gcGFyc2VJbnQocHJvZ3Jlc3NCYXIuc3R5bGUubGVmdCkgfHwgMFxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuc3R5bGUubGVmdCA9IGAke3Byb2dyZXNzU3RlcCppbmRleH0lYFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRyb2xzUHJldi5kaXNhYmxlZCA9IChpbmRleCA9PSAwKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgIGNvbnRyb2xzTmV4dC5kaXNhYmxlZCA9IChpbmRleCA9PSBjb250cm9sc0VuZEluZGV4KSA/IHRydWUgOiBmYWxzZVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgZmxrdHkub24oJ2NoYW5nZScsIChpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA+PSBjb250cm9sc0VuZEluZGV4KSB7XG4gICAgICAgICAgICBmbGt0eS5zZWxlY3QoY29udHJvbHNFbmRJbmRleClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8vIGRyb3BcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRyb3Atc3RhdGU9XCIxXCJdJylcblxuICAgIGlmIChkcm9wICYmICFlLnRhcmdldC5jbG9zZXN0KCcuZHJvcC5zaG93JykgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWRyb3Atc3RhdGU9XCIxXCJdJykpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZHJvcC5jbGljaygpXG4gICAgfVxuXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcF0nKS5mb3JFYWNoKChkcm9wLCBpKSA9PiB7XG4gICAgZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgZGF0YSA9IGRyb3AuZGF0YXNldC5kcm9wLFxuICAgICAgICAgICAgZHJvcENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wLWNvbnRlbnQ9XCIke2RhdGF9XCJdYCksXG4gICAgICAgICAgICBzdGF0ZSA9IE51bWJlcihkcm9wLmRhdGFzZXQuZHJvcFN0YXRlKVxuXG4gICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBkcm9wQ29udGVudC5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgZHJvcENvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZHJvcC5kYXRhc2V0LmRyb3BTdGF0ZSA9IE51bWJlcighc3RhdGUpXG5cbiAgICB9KVxuXG4gICAgZHJvcC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnRhcmdldC5jbGljaygpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyByYXRpbmdcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmF0aW5nJykuZm9yRWFjaCgocmF0aW5nLCBpKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBOdW1iZXIocmF0aW5nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXN0YXJzXScpLmRhdGFzZXQuc3RhcnMpXG5cbiAgICByYXRpbmcucXVlcnlTZWxlY3RvckFsbCgnLnN0YXInKS5mb3JFYWNoKChzdGFyLCBrKSA9PiB7XG4gICAgICBpZiAoayA8IHZhbHVlKSB7XG4gICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnc3Rhcl9maWxsJylcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHByZXZBbGwoZWxlbWVudCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKVxuICAgICAgICByZXN1bHQucHVzaChlbGVtZW50KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbmV4dEFsbChlbGVtZW50KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZylcbiAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJGb2N1cyhzdGFyKSB7XG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdzdGFyX2hvdmVyJylcblxuICAgIHByZXZBbGwoc3RhcikuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3N0YXJfaG92ZXInKVxuICAgIH0pXG5cbiAgICBuZXh0QWxsKHN0YXIpLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzdGFyX2hvdmVyJylcbiAgICB9KVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXInKS5mb3JFYWNoKChzdGFyLCBpKSA9PiB7XG4gICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgIHN0YXJGb2N1cyhzdGFyKVxuICAgIH0pXG5cbiAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHtcbiAgICAgIHN0YXJGb2N1cyhzdGFyKVxuICAgIH0pXG5cbiAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXJfaG92ZXInKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzdGFyX2hvdmVyJylcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ3N0YXJfZmlsbCcpXG5cbiAgICAgIHByZXZBbGwoc3RhcikuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc3Rhcl9maWxsJylcbiAgICAgIH0pXG5cbiAgICAgIG5leHRBbGwoc3RhcikuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc3Rhcl9maWxsJylcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgc3Rhci5jbGljaygpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyBzZWxlY3RcbiAgJCgnc2VsZWN0JykubmljZVNlbGVjdCgpO1xuXG4gIC8vIHNpZGUgYWRhcHRpdmVcbiAgY29uc3QgYXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhcicpXG5cbiAgaWYgKGF2YXRhcikge1xuICAgIGF2YXRhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAod2luZG93Lm91dGVyV2lkdGggPD0gNzY4KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZV9fc2lkZScpLmNsYXNzTGlzdC50b2dnbGUoJ3BhZ2VfX3NpZGVfc2hvdycpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIG1vZGFsc1xuICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1vcGVuXScpLmZvckVhY2goKHRyaWdnZXIsIGkpID0+IHtcbiAgLy8gICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICAgY29uc3QgdCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLW1vZGFsLW9wZW5dJyksXG4gIC8vICAgICAgICAgICBkYXRhID0gdC5kYXRhc2V0Lm1vZGFsT3BlbixcbiAgLy8gICAgICAgICAgIG1vZGFsRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW1vZGFsPVwiJHtkYXRhfVwiXWApXG4gIC8vXG4gIC8vICAgICBsZXQgbW9kYWxDb250ZW50ID0gbW9kYWxFbGVtZW50LmlubmVySFRNTFxuICAvL1xuICAvLyAgICAgbGV0IG1vZGFsID0gbmV3IHRpbmdsZS5tb2RhbCh7XG4gIC8vICAgICAgIGNsb3NlTWV0aG9kczogWydvdmVybGF5JywgJ2VzY2FwZSddLFxuICAvLyAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcbiAgLy8gICAgICAgICB0aGlzLnJlbW92ZSgpXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIGNzc0NsYXNzOiBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0XG4gIC8vICAgICB9KTtcbiAgLy9cbiAgLy8gICAgIG1vZGFsLnNldENvbnRlbnQobW9kYWxDb250ZW50KVxuICAvLyAgICAgbW9kYWwub3BlbigpXG4gIC8vXG4gIC8vICAgICBjb25zdCBmb3JtcyA9IG1vZGFsLm1vZGFsQm94Q29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJylcbiAgLy9cbiAgLy8gICAgIHRyeSB7XG4gIC8vICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIC8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vICAgICAgICAgbW9kYWwuY2xvc2UoKVxuICAvLyAgICAgICB9KVxuICAvLyAgICAgfSBjYXRjaCAoZSkge1xuICAvL1xuICAvLyAgICAgfVxuICAvLyAgIH0pXG4gIC8vIH0pXG5cbiAgLy8gbW9kYWxzXG5cbiAgJCgnW2RhdGEtbW9kYWwtdHlwZT1cIm1vZGFsXCJdJykuaXppTW9kYWwoKVxuXG4gICQoJ1tkYXRhLW1vZGFsLW9wZW5dJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgY29uc3QgZGF0YSA9ICQodGhpcykuZGF0YSgnbW9kYWwtb3BlbicpLFxuICAgICAgICAgIG1vZGFsID0gJChgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYCksXG4gICAgICAgICAgdHlwZSA9ICQobW9kYWwpLmRhdGEoJ21vZGFsLXR5cGUnKVxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICd2aWRlbyc6XG4gICAgICAgIGNvbnN0IHVybFZpZGVvID0gJCh0aGlzKS5hdHRyKCdocmVmJylcblxuICAgICAgICAkKG1vZGFsKS5pemlNb2RhbCh7XG4gICAgICAgICAgaWZyYW1lOiB0cnVlLFxuICAgICAgICAgIG92ZXJsYXlDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC45KScsXG4gICAgICAgICAgaWZyYW1lVVJMOiB1cmxWaWRlb1xuICAgICAgICB9KVxuXG4gICAgICAgICQobW9kYWwpLml6aU1vZGFsKCdvcGVuJylcblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgICQobW9kYWwpLml6aU1vZGFsKCdvcGVuJylcblxuICAgIH1cblxuICB9KVxuXG5cbn0pKHdpbmRvdyk7XG4iXX0=
