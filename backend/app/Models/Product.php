<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Storage;

class Product extends Model
{
    //
    protected $fillable = [
        'name',
        'price',
        'stock',
        'description',
        'image',
    ];

       public function getImageAttribute()
{
    $filename = $this->attributes['image'] ?? null;

    if ($filename && Storage::disk('public')->exists("products/$filename")) {
        // Mengembalikan URL dari file di storage/app/public/product
        return asset("storage/products/$filename");
    }

    // Fallback jika gambar tidak ditemukan
    return 'https://api.dicebear.com/9.x/notionists/svg';
}

}
