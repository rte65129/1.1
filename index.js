const sequelize = require('./database');
const Car = require('./models/Car');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к SQLite установлено.');

    await sequelize.sync({ force: true });
    console.log('Таблица cars синхронизирована.');

    const cars = await Car.bulkCreate([
      { brand: 'Toyota', model: 'Camry', year: 2022, price: 2500000, isAvailable: true },
      { brand: 'BMW', model: 'X5', year: 2021, price: 5500000, isAvailable: false },
      { brand: 'Lada', model: 'Vesta', year: 2023, price: 1200000, isAvailable: true },
    ]);
    console.log(`Добавлено автомобилей: ${cars.length}`);

    const allCars = await Car.findAll();
    console.log('Список автомобилей:');
    allCars.forEach((car) => {
      console.log(car.toJSON());
    });
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
    console.log('Соединение закрыто.');
  }
}

main();