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
          var progressCurrent = parseInt(progressBar.style.left) || 0;
          console.log(progressCurrent);
          progressBar.style.left = progressCurrent + progressStep + '%';
        });

        if (flkty.selectedIndex === 0) {
          controlsPrev.disabled = true;
        } else if (flkty.selectedIndex === controlsEndIndex) {
          controlsNext.disabled = true;
        }

        flkty.on('select', function (index) {
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

  // modals
  document.querySelectorAll('[data-modal-open]').forEach(function (trigger, i) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      var t = e.target.closest('[data-modal-open]'),
          data = t.dataset.modalOpen,
          modalElement = document.querySelector('[data-modal="' + data + '"]');

      var modalContent = modalElement.innerHTML;

      if (data == 'gallery') {
        modalContent = t.innerHTML;
      }

      var modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function onClose() {
          this.remove();
        },
        cssClass: modalElement.classList
      });

      modal.setContent(modalContent);
      modal.open();

      var forms = modal.modalBoxContent.querySelectorAll('form');

      try {
        document.querySelector('.modal__close').addEventListener('click', function (e) {
          e.preventDefault();
          modal.close();
        });
      } catch (e) {}
    });
  });
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwic2xpZGVyT3B0aW9ucyIsImNlbGxBbGlnbiIsInBhZ2VEb3RzIiwicHJldk5leHRCdXR0b25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNsaWRlciIsImkiLCJzbGlkZXMiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVzQ291bnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNsaWRlckRhdGEiLCJkYXRhc2V0Iiwib3B0aW9ucyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzbGlkZVdpZHRoIiwic2xpZGVzQ2FwYWNpdHkiLCJNYXRoIiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwicHJvZ3Jlc3NCYXIiLCJwcm9ncmVzc1N0ZXAiLCJzdHlsZSIsIndpZHRoIiwiY2xhc3NMaXN0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJwcm9ncmVzc0N1cnJlbnQiLCJwYXJzZUludCIsImxlZnQiLCJjb25zb2xlIiwibG9nIiwic2VsZWN0ZWRJbmRleCIsImRpc2FibGVkIiwib24iLCJpbmRleCIsInNlbGVjdCIsImRyb3AiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2xpY2siLCJkYXRhIiwiZHJvcENvbnRlbnQiLCJzdGF0ZSIsImRyb3BTdGF0ZSIsInJlbW92ZSIsImtleUNvZGUiLCJ0cmlnZ2VyIiwidCIsIm1vZGFsT3BlbiIsIm1vZGFsRWxlbWVudCIsIm1vZGFsQ29udGVudCIsImlubmVySFRNTCIsIm1vZGFsIiwidGluZ2xlIiwiY2xvc2VNZXRob2RzIiwib25DbG9zZSIsImNzc0NsYXNzIiwic2V0Q29udGVudCIsIm9wZW4iLCJmb3JtcyIsIm1vZGFsQm94Q29udGVudCIsImNsb3NlIl0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsVUFBU0EsSUFBVCxFQUFlOztBQUVkO0FBQ0FDO0FBQ0FDOztBQUVBLE1BQU1DLGdCQUFnQjtBQUNwQixhQUFTO0FBQ1BDLGlCQUFXLE1BREo7QUFFUEMsZ0JBQVUsS0FGSDtBQUdQQyx1QkFBaUI7QUFIVjtBQURXLEdBQXRCOztBQVFBQyxXQUFTQyxnQkFBVCxDQUEwQixlQUExQixFQUEyQ0MsT0FBM0MsQ0FBbUQsVUFBQ0MsTUFBRCxFQUFTQyxDQUFULEVBQWU7QUFDaEUsUUFBTUMsU0FBU0YsT0FBT0csYUFBUCxDQUFxQixzQkFBckIsQ0FBZjtBQUFBLFFBQ01DLGNBQWNGLE9BQU9HLFFBQVAsQ0FBZ0JDLE1BRHBDO0FBQUEsUUFFTUMsYUFBYVAsT0FBT1EsT0FBUCxDQUFlUixNQUZsQztBQUFBLFFBR01TLFVBQVVoQixjQUFjYyxVQUFkLENBSGhCO0FBQUEsUUFJTUcsY0FBY1YsT0FBT1csV0FKM0I7QUFBQSxRQUtNQyxhQUFhVixPQUFPRyxRQUFQLENBQWdCLENBQWhCLEVBQW1CTSxXQUx0QztBQUFBLFFBTU1FLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXTCxjQUFZRSxVQUF2QixDQU52QjtBQUFBLFFBT01JLFdBQVdoQixPQUFPRyxhQUFQLENBQXFCLHdCQUFyQixDQVBqQjtBQUFBLFFBUU1jLGVBQWVELFNBQVNiLGFBQVQsQ0FBdUIsNkJBQXZCLENBUnJCO0FBQUEsUUFTTWUsZUFBZUYsU0FBU2IsYUFBVCxDQUF1Qiw2QkFBdkIsQ0FUckI7QUFBQSxRQVVNZ0IsbUJBQW1CZixjQUFjUyxjQVZ2QztBQUFBLFFBV01PLFdBQVdDLE9BQU9yQixPQUFPUSxPQUFQLENBQWVjLGNBQXRCLENBWGpCO0FBQUEsUUFZTUMsY0FBY0MsT0FBT0MsVUFaM0I7QUFBQSxRQWFNQyxjQUFjMUIs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aEM7QUFMSSxPQUFqQixDQUFaOztBQVFBbUMsWUFBTUssVUFBTixDQUFpQlAsWUFBakI7QUFDQUUsWUFBTU0sSUFBTjs7QUFFQSxVQUFNQyxRQUFRUCxNQUFNUSxlQUFOLENBQXNCM0UsZ0JBQXRCLENBQXVDLE1BQXZDLENBQWQ7O0FBRUEsVUFBSTtBQUNGRCxpQkFBU00sYUFBVCxDQUF1QixlQUF2QixFQUF3QytCLGdCQUF4QyxDQUF5RCxPQUF6RCxFQUFrRSxVQUFDQyxDQUFELEVBQU87QUFDdkVBLFlBQUVDLGNBQUY7QUFDQTZCLGdCQUFNUyxLQUFOO0FBQ0QsU0FIRDtBQUlELE9BTEQsQ0FLRSxPQUFPdkMsQ0FBUCxFQUFVLENBRVg7QUFDRixLQWxDRDtBQW1DRCxHQXBDRDtBQXVDRCxDQTFKRCxFQTBKR1gsTUExSkgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KClcbiAgc2Nyb2xsVG8oKVxuXG4gIGNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgJ2l0ZW1zJzoge1xuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlcl0nKS5mb3JFYWNoKChzbGlkZXIsIGkpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXNsaWRlc10nKSxcbiAgICAgICAgICBzbGlkZXNDb3VudCA9IHNsaWRlcy5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgc2xpZGVyRGF0YSA9IHNsaWRlci5kYXRhc2V0LnNsaWRlcixcbiAgICAgICAgICBvcHRpb25zID0gc2xpZGVyT3B0aW9uc1tzbGlkZXJEYXRhXSxcbiAgICAgICAgICBzbGlkZXJXaWR0aCA9IHNsaWRlci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJyksXG4gICAgICAgICAgY29udHJvbHNFbmRJbmRleCA9IHNsaWRlc0NvdW50IC0gc2xpZGVzQ2FwYWNpdHksXG4gICAgICAgICAgYWRhcHRpdmUgPSBOdW1iZXIoc2xpZGVyLmRhdGFzZXQuc2xpZGVyQWRhcHRpdmUpLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgcHJvZ3Jlc3NCYXIgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXByb2dyZXNzXScpLFxuICAgICAgICAgIHByb2dyZXNzU3RlcCA9IE1hdGgucm91bmQoMTAwIC8gKHNsaWRlc0NvdW50LXNsaWRlc0NhcGFjaXR5KzEpKVxuXG4gICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc1N0ZXB9JWBcblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2luaXRpYWwnKVxuICAgICAgY29uc3QgZmxrdHkgPSBuZXcgRmxpY2tpdHkoc2xpZGVzLCBzbGlkZXJPcHRpb25zW3NsaWRlci5kYXRhc2V0LnNsaWRlcl0pO1xuXG4gICAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHNQcmV2XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkucHJldmlvdXMoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NDdXJyZW50ID0gcGFyc2VJbnQocHJvZ3Jlc3NCYXIuc3R5bGUubGVmdCkgfHwgMFxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZ3Jlc3NDdXJyZW50KVxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuc3R5bGUubGVmdCA9IGAke3Byb2dyZXNzQ3VycmVudCtwcm9ncmVzc1N0ZXB9JWBcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgY29udHJvbHNQcmV2LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGZsa3R5LnNlbGVjdGVkSW5kZXggPT09IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBmbGt0eS5vbignc2VsZWN0JywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgY29udHJvbHNQcmV2LmRpc2FibGVkID0gKGluZGV4ID09IDApID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgY29udHJvbHNOZXh0LmRpc2FibGVkID0gKGluZGV4ID09IGNvbnRyb2xzRW5kSW5kZXgpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIH0pXG5cbiAgICAgICAgZmxrdHkub24oJ2NoYW5nZScsIChpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA+PSBjb250cm9sc0VuZEluZGV4KSB7XG4gICAgICAgICAgICBmbGt0eS5zZWxlY3QoY29udHJvbHNFbmRJbmRleClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8vIGRyb3BcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRyb3Atc3RhdGU9XCIxXCJdJylcblxuICAgIGlmIChkcm9wICYmICFlLnRhcmdldC5jbG9zZXN0KCcuZHJvcC5zaG93JykgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWRyb3Atc3RhdGU9XCIxXCJdJykpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZHJvcC5jbGljaygpXG4gICAgfVxuXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcF0nKS5mb3JFYWNoKChkcm9wLCBpKSA9PiB7XG4gICAgZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgZGF0YSA9IGRyb3AuZGF0YXNldC5kcm9wLFxuICAgICAgICAgICAgZHJvcENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wLWNvbnRlbnQ9XCIke2RhdGF9XCJdYCksXG4gICAgICAgICAgICBzdGF0ZSA9IE51bWJlcihkcm9wLmRhdGFzZXQuZHJvcFN0YXRlKVxuXG4gICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBkcm9wQ29udGVudC5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgZHJvcENvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZHJvcC5kYXRhc2V0LmRyb3BTdGF0ZSA9IE51bWJlcighc3RhdGUpXG5cbiAgICB9KVxuXG4gICAgZHJvcC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnRhcmdldC5jbGljaygpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyBtb2RhbHNcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtb3Blbl0nKS5mb3JFYWNoKCh0cmlnZ2VyLCBpKSA9PiB7XG4gICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgdCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLW1vZGFsLW9wZW5dJyksXG4gICAgICAgICAgICBkYXRhID0gdC5kYXRhc2V0Lm1vZGFsT3BlbixcbiAgICAgICAgICAgIG1vZGFsRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW1vZGFsPVwiJHtkYXRhfVwiXWApXG5cbiAgICAgIGxldCBtb2RhbENvbnRlbnQgPSBtb2RhbEVsZW1lbnQuaW5uZXJIVE1MXG5cbiAgICAgIGlmIChkYXRhID09ICdnYWxsZXJ5Jykge1xuICAgICAgICBtb2RhbENvbnRlbnQgPSB0LmlubmVySFRNTFxuICAgICAgfVxuXG4gICAgICBsZXQgbW9kYWwgPSBuZXcgdGluZ2xlLm1vZGFsKHtcbiAgICAgICAgY2xvc2VNZXRob2RzOiBbJ292ZXJsYXknLCAnZXNjYXBlJ10sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgfSxcbiAgICAgICAgY3NzQ2xhc3M6IG1vZGFsRWxlbWVudC5jbGFzc0xpc3RcbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbC5zZXRDb250ZW50KG1vZGFsQ29udGVudClcbiAgICAgIG1vZGFsLm9wZW4oKVxuXG4gICAgICBjb25zdCBmb3JtcyA9IG1vZGFsLm1vZGFsQm94Q29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJylcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBtb2RhbC5jbG9zZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG5cbn0pKHdpbmRvdyk7XG4iXX0=
