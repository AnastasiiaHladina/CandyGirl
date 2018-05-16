
// Определим переменные, которые нам нужно вычислить
 let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

 const hitRectangle = (r1, r2) => {
        // hit определяет, есть ли столкновение
        hit = false;

        // Находим центральные точки каждого спрайта
        r1.centerX = r1.x + r1.width / 2; 
        r1.centerY = r1.y + r1.height / 2; 
        r2.centerX = r2.x + r2.width / 2; 
        r2.centerY = r2.y + r2.height / 2; 

        // Найдите полуширины и полувысоты каждого спрайта
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        // Вычислить вектор расстояния между спрайтами
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        // Вычислить комбинированные полуширины и полувысоты
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        // Проверяем наличие столкновения по оси x
        if (Math.abs(vx) < combinedHalfWidths) {

        // Проверяем наличие столкновения по оси y
          if (Math.abs(vy) < combinedHalfHeights) {

        // Произошло столкновение по оси y
            hit = true;
          } else {

        // Нет столкновения по оси y
            hit = false;
          }
        } else {

        // Нет столкновения по оси x
          hit = false;
        }

        // `hit` будет либо` true`, либо `false`
        return hit;
}; 


module.exports = { 
    hitRectangle
}