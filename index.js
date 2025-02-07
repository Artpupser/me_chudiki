class CubeController {
   constructor(cubeElement) {
      this.cube = cubeElement;
      this.isMouseDown = false;
      this.startX = 0;
      this.startY = 0; // Сохраняем начальную позицию по Y
      this.currentX = 0;
      this.currentY = 0; // Угол по Y
      this.rotateSpeed = 0.2;
      this.connectHandlers();
   }

   connectHandlers() {
      document.addEventListener('mousedown', (event) => this.onMouseDown(event));
      document.addEventListener('mouseup', () => this.onMouseUp());
      document.addEventListener('mousemove', (event) => this.onMouseMove(event));
      document.addEventListener('touchstart', (event) => this.onTouchStart(event));
      document.addEventListener('touchend', () => this.onTouchEnd());
      document.addEventListener('touchmove', (event) => this.onTouchMove(event));
   }

   onMouseDown(event) {
      this.isMouseDown = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
   }

   onMouseUp() {
      this.isMouseDown = false;
      this.snapToNearestSide();
   }

   onMouseMove(event) {
      if (!this.isMouseDown) return;
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY; // Разница по Y

      this.currentX += deltaX * this.rotateSpeed; // Увеличьте или уменьшите скорость вращения по Y
      this.currentY += deltaY * this.rotateSpeed; // Увеличьте или уменьшите скорость вращения по X

      this.updateTransform();
      this.startX = event.clientX;
      this.startY = event.clientY; // Обновляем начальную позицию по Y
   }

   onTouchStart(event) {
      this.isMouseDown = true;
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY; // Сохраняем начальную позицию по Y
   }

   onTouchEnd() {
      this.isMouseDown = false;
      this.snapToNearestSide();
   }

   onTouchMove(event) {
      if (this.isMouseDown) {
         this.onMouseMove(event.touches[0]);
      }
   }

   snapToNearestSide() {
      this.currentX = Math.round(this.currentX / 90) * 90;
      this.currentY = Math.round(this.currentY / 90) * 90; // Округляем угол по Y
      this.updateTransform();
   }

   updateTransform() {
      this.cube.style.transform = `rotateY(${this.currentX}deg) rotateX(${-this.currentY}deg)`;
   }
}

const cubeElement = document.getElementById('cube');
const cubeController = new CubeController(cubeElement);
