class CubeController {
   constructor(cubeElement) {
      this.cube = cubeElement;
      this.isMouseDown = false;
      this.startX = 0;
      this.currentX = 0;
      this.scale = 1;
      this.scaleRange = { min: 0.5, max: 1.2 };
      this.rotateSpeedDelta = 0.2;
      this.scaleFactor = 0.1;
      this.initialDistance = null;

      this.initEventListeners();
   }

   initEventListeners() {
      document.addEventListener('mousedown', (event) => this.onMouseDown(event));
      document.addEventListener('mouseup', () => this.onMouseUp());
      document.addEventListener('mousemove', (event) => this.onMouseMove(event));
      document.addEventListener('touchstart', (event) => this.onTouchStart(event));
      document.addEventListener('touchend', () => this.onTouchEnd());
      document.addEventListener('touchmove', (event) => this.onTouchMove(event));
      document.addEventListener('wheel', (event) => this.onWheel(event));
   }

   onMouseDown(event) {
      this.isMouseDown = true;
      this.startX = event.clientX;
   }

   onMouseUp() {
      this.isMouseDown = false;
      this.snapToNearestSide();
   }

   onMouseMove(event) {
      if (!this.isMouseDown) return;
      const deltaX = event.clientX - this.startX;
      this.currentX += deltaX * this.rotateSpeedDelta;
      this.updateTransform();
      this.startX = event.clientX;
   }

   onTouchStart(event) {
      this.isMouseDown = true;
      this.startX = event.touches[0].clientX;
   }

   onTouchEnd() {
      this.isMouseDown = false;
      this.snapToNearestSide();
      this.initialDistance = null;
   }

   onTouchMove(event) {
      if (this.isMouseDown) {
         this.onMouseMove(event.touches[0]);
         if (event.touches.length === 2) {
            this.handlePinchZoom(event);
         }
      }
   }

   onWheel(event) {
      event.preventDefault();
      this.scale += event.deltaY > 0 ? -this.scaleFactor : this.scaleFactor;
      this.scale = Math.min(Math.max(this.scaleRange.min, this.scale), this.scaleRange.max);
      this.updateTransform();
   }

   handlePinchZoom(event) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (this.initialDistance === null) {
         this.initialDistance = distance;
      } else {
         this.scale *= distance / this.initialDistance;
         this.scale = Math.min(Math.max(this.scaleRange.min, this.scale), this.scaleRange.max);
         this.updateTransform();
         this.initialDistance = distance;
      }
   }

   snapToNearestSide() {
      this.currentX = Math.round(this.currentX / 90) * 90;
      this.updateTransform();
   }

   updateTransform() {
      this.cube.style.transform = `rotateY(${this.currentX}deg) scale(${this.scale})`;
   }
}

const cubeElement = document.getElementById('cube');
const cubeController = new CubeController(cubeElement);
