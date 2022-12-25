<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ContactUs extends Model
{
    use HasFactory;
    use HasUuids;

    public function isValid(Request $request) {
      return Validator::validate($request->all(), [
        'name' => [ 'required', 'max:255' ],
        'email' => [ 'required', 'email', 'max:255' ],
        'message' => [ 'required' ],
        'file' => ['required', 
          /* 'file',
          'max:12288' */
          File::image()
            // ->min(1024)
            ->max(12 * 1024)
            // ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500))
        ]
      ]);
    }
}
