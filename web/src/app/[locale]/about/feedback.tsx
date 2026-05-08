'use client';

import { useMemo, useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/react';

export default function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = useMemo(() => {
    if (email === '') return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const isInvalidForm = useMemo(() => {
    if (name === '' || email === '' || message === '') return true;
    if (isInvalidEmail) return true;
    return false;
  }, [email, name, message, isInvalidEmail]);

  function submitFeedback() {
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:thomas@braytel.net?subject=Big Five feedback&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className='flex gap-4 mt-10'>
        <div className='w-1/2'>
          <Input
            name='name'
            label='Name'
            variant='bordered'
            value={name}
            onValueChange={setName}
          />
        </div>

        <div className='w-1/2'>
          <Input
            value={email}
            name='email'
            type='email'
            label='Email'
            variant='bordered'
            isInvalid={isInvalidEmail}
            color={isInvalidEmail ? 'danger' : undefined}
            errorMessage={isInvalidEmail && 'Please enter a valid email'}
            onValueChange={setEmail}
          />
        </div>
      </div>
      <div className='flex mt-4'>
        <div className='w-full'>
          <Textarea
            name='message'
            label='Message'
            placeholder='Enter your message'
            value={message}
            onValueChange={setMessage}
          />
        </div>
      </div>
      <Button
        color='primary'
        className='mt-4'
        type='button'
        isDisabled={isInvalidForm}
        onPress={submitFeedback}
      >
        Submit
      </Button>
      {sent && (
        <div className='mt-4'>
          <Chip className='mt-4' color='success' size='lg'>
            <p>Your email app should open with the feedback message.</p>
          </Chip>
        </div>
      )}
    </form>
  );
}
