<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactUs;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactUsController extends Controller
{
    
    /**
     * save contact information and send email.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request, ContactUs $contactUs) {
      $validationResponse = $contactUs->isValid($request);

      if($validationResponse) {
        $path = Storage::putFile('file', $request->file('file'));
        $contactDetails = new ContactUs;
        $contactDetails->name = $request->name;
        $contactDetails->email = $request->email;
        $contactDetails->message = $request->message;
        $contactDetails->file = $path;
        $contactDetails->save();

        Mail::to($request->email)->send(new ContactMail($contactDetails));

        return response()->json([ "message" => "Contact saved successfully!" ], 200);
      }
      return $validationResponse;
    }
}
