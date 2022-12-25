<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
use App\Models\ContactUs;
use Illuminate\Mail\Mailables\Attachment;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The contactUs instance.
     *
     * @var \App\Models\ContactUs
     */
    public $contactUs;
 
    /**
     * Create a new message instance.
     *
     * @param  \App\Models\ContactUs  $contactUs
     * @return void
     */
    public function __construct(ContactUs $contactUs)
    {
        $this->contactUs = $contactUs;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
          from: new Address('test@mail.com', 'Test'),
          subject: 'Contact Mail',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.contact',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
      return [
        Attachment::fromPath(storage_path('app/'.$this->contactUs->file))
      ];
    }
}
