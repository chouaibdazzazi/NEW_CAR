<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'brand', 'model', 'year', 'price_per_day',
        'available', 'image_url', 'color', 'seats', 'description'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
