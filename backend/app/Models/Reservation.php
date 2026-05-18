<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id', 'car_id', 'start_date', 'end_date', 'total_price', 'status'
    ];

    public function car()   { return $this->belongsTo(Car::class); }
    public function user()  { return $this->belongsTo(User::class); }
}
