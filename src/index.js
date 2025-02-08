class CubeController {
   constructor(cubeElement) {
      this.cube = cubeElement;
      this.isTouchScreen = false;
      this.startX = 0;
      this.startY = 0; // Сохраняем начальную позицию по Y
      this.currentX = 0;
      this.currentY = 0; // Угол по Y
      this.rotateSpeed = 0.2;
      this.swapForce = 2;
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
      this.isTouchScreen = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
   }

   onMouseUp() {
      this.isTouchScreen = false;
      this.snapToNearestSide();
   }

   onMouseMove(event) {
      if (!this.isTouchScreen) return;
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;

      this.currentX += deltaX * this.rotateSpeed;
      this.currentY += deltaY * this.rotateSpeed;

      this.updateTransform();
      this.startX = event.clientX;
      this.startY = event.clientY;
   }

   onTouchStart(event) {
      this.isTouchScreen = true;
      this.startX = event.touches[0].clientX * swapSpeed;
      this.startY = event.touches[0].clientY * swapSpeed;
   }

   onTouchEnd() {
      this.isTouchScreen = false;
      this.snapToNearestSide();
   }

   onTouchMove(event) {
      if (!this.isTouchScreen) return;
      this.onMouseMove(event.touches[0]);
   }

   snapToNearestSide() {
      this.currentX = Math.round(this.currentX / 90) * 90;
      this.currentY = Math.round(this.currentY / 90) * 90;
      this.updateTransform();
   }

   updateTransform() {
      this.cube.style.transform = `rotateY(${this.currentX}deg) rotateX(${-this.currentY}deg)`;
   }
}

const cubeElement = document.getElementById('cube');
const cubeController = new CubeController(cubeElement);
class ListItem {
   constructor(link, image, text) {
      this.link = link;
      this.image = image;
      this.text = text;
   }

   createElement() {
      const li = document.createElement('li');
      li.className = 'item';

      const a = document.createElement('a');
      a.href = this.link;
      a.target = '_blank';

      const img = document.createElement('img');
      img.src = this.image;
      img.alt = this.text;

      a.appendChild(img);
      a.appendChild(document.createTextNode(this.text));
      li.appendChild(a);

      return li;
   }
}

class List {
   constructor(containerId, items) {
      this.container = document.getElementById(containerId);
      this.items = items.map(item => new ListItem(item.link, item.image, item.text));
   }

   render() {
      const ul = document.createElement('ul');
      this.items.forEach(item => {
         ul.appendChild(item.createElement());
      });
      this.container.appendChild(ul);
   }
}
const config_links = [
   {
      link: 'https://discord.gg/yTACqmKdy4',
      image: './img/discord.png',
      text: 'Discord'
   },
   {
      link: 'https://vk.com/me_chudiki',
      image: './img/vk.svg',
      text: 'Vk'
   },
   {
      link: 'https://t.me/me_chudiki',
      image: "./img/tg.svg",
      text: "Tg"
   }
];

const config_clans = [
   {
      link: 'https://steamcommunity.com/groups/me_chudiki',
      image: "./img/steam.png",
      text: "Steam"
   }
];

const list_links = new List('list-link', config_links);
const list_clans = new List('list-clans', config_clans)
list_links.render();
list_clans.render();