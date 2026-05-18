<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            ['brand'=>'Toyota','model'=>'Corolla','year'=>2022,'price_per_day'=>350,'color'=>'Blanc','seats'=>5],
            ['brand'=>'Dacia', 'model'=>'Duster', 'year'=>2023,'price_per_day'=>280,'color'=>'Gris', 'seats'=>5],
            ['brand'=>'Renault','model'=>'Clio',  'year'=>2021,'price_per_day'=>220,'color'=>'Rouge','seats'=>5],
            ['brand'=>'Hyundai','model'=>'Tucson', 'year'=>2023,'price_per_day'=>420,'color'=>'Noir', 'seats'=>5],
        ];

        foreach ($cars as $car) {
            Car::create(array_merge($car, ['available' => true]));
        }
    }
}
