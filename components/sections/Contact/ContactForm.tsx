'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/form';
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/input/Textarea';
import { Loader2Icon, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../../../emailjs-config';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: '이름을 입력해주세요',
  }),
  email: z.string().email({
    message: '유효한 이메일 주소를 입력해주세요',
  }),
  number: z
    .string()
    .min(10, { message: '유효한 전화번호를 입력해주세요' })
    .regex(/^[0-9-]+$/, { message: '전화번호는 숫자와 하이픈만 입력해주세요' }),
  message: z.string().min(5, {
    message: '최소 5자 이상의 메시지를 입력해주세요',
  }),
});

type FormData = z.infer<typeof FormSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // 전화번호 자동 하이픈 추가 함수
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/[^0-9]/g, '');

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      number: '',
      message: '',
    },
  });

  React.useEffect(() => {
    if (emailjsConfig.publicKey) {
      emailjs.init(emailjsConfig.publicKey);
    } else {
      console.error('EmailJS 공개 키가 설정되지 않았습니다.');
    }
  }, []);

  const onSubmit = async (data: FormData): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 전화번호에서 하이픈 제거 (숫자만 추출)
      const cleanPhoneNumber = data.number.replace(/[^0-9]/g, '');

      const templateParams = {
        // 기본 정보
        from_name: data.name.trim(),
        from_email: data.email.trim(),
        from_phone: cleanPhoneNumber,
        message: data.message.trim(),
        subject: `새로운 문의: ${data.name}님으로부터`,
      };

      // EmailJS 설정 검증
      if (!emailjsConfig.serviceId || !emailjsConfig.templateId) {
        throw new Error('EmailJS 설정이 완료되지 않았습니다.');
      }

      // EmailJS를 사용해서 이메일 전송
      const response = await emailjs.send(
        emailjsConfig.serviceId, // EmailJS 서비스 ID
        emailjsConfig.templateId, // EmailJS 템플릿 ID
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('메시지가 성공적으로 전송되었습니다!');
        form.reset();

        // 3초 후 상태 초기화
        setTimeout(() => {
          setSubmitStatus('idle');
          setStatusMessage('');
        }, 3000);
      } else {
        throw new Error('이메일 전송에 실패했습니다');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('메시지 전송에 실패했습니다. 다시 시도해주세요.');

      // 5초 후 상태 초기화
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-[4vw]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="name*"
                  {...field}
                  aria-label="이름"
                  aria-required="true"
                  className="text-[4vw] py-[1vw] md:text-[3vw] lg:text-[1.2vw]"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-[2.5vw] md:text-[2vw] lg:text-[0.8vw]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="email*"
                  {...field}
                  type="email"
                  aria-label="이메일 주소"
                  aria-required="true"
                  className="text-[4vw] py-[1vw] md:text-[3vw] lg:text-[1.2vw]"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-[2.5vw] md:text-[2vw] lg:text-[0.8vw]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="phone number*"
                  value={field.value}
                  type="phone number"
                  inputMode="numeric"
                  aria-label="전화번호"
                  aria-required="true"
                  onChange={(e) => {
                    const formattedValue = formatPhoneNumber(e.target.value);
                    field.onChange(formattedValue);
                  }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      '0',
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      'Backspace',
                      'Delete',
                      'Tab',
                      'Enter',
                      'ArrowLeft',
                      'ArrowRight',
                      'ArrowUp',
                      'ArrowDown',
                    ];
                    if (!allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  className="text-[4vw] py-[1vw] md:text-[3vw] lg:text-[1.2vw]"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-[2.5vw] md:text-[2vw] lg:text-[0.8vw]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="message*"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  aria-label="message"
                  aria-required="true"
                  className="text-[4vw] py-[1vw] min-h-[16vw] md:text-[3vw] md:min-h-[12vw] lg:text-[1.2vw] lg:min-h-[8vw]"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-[2.5vw] md:text-[2vw] lg:text-[0.8vw]" />
            </FormItem>
          )}
        />

        {submitStatus !== 'idle' && (
          <div
            className={`flex items-center gap-2 text-[3vw] md:text-[2.5vw] lg:text-[1vw] ${
              submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {submitStatus === 'success' ? (
              <CheckCircle className="w-[3vw] h-[3vw] md:w-[2.5vw] md:h-[2.5vw] lg:w-[1vw] lg:h-[1vw]" />
            ) : (
              <XCircle className="w-[3vw] h-[3vw] md:w-[2.5vw] md:h-[2.5vw] lg:w-[1vw] lg:h-[1vw]" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="flex justify-end pt-[2vw]">
          <button
            type="submit"
            data-cursor-text="Submit!!"
            data-cursor-color="var(--brand-primary)"
            data-cursor-size="90px"
            className="rounded-full bg-black text-white dark:bg-gray-200 dark:text-black font-heading text-[3.5vw] uppercase flex items-center justify-center px-[8vw] py-[4vw] hover:bg-gray-800 dark:hover:bg-gray-200  md:text-[2.5vw] md:px-[5vw] md:py-[2.5vw] lg:text-[1.2vw] lg:px-[3vw] lg:py-[1.5vw] hover:shadow-[0_0_30px_rgba(93,90,214,0.3)] duration-700 transition-all ease-out hover:scale-105 backdrop-blur-sm"
            disabled={isSubmitting}
            aria-label="연락처 폼 제출"
          >
            {isSubmitting ? (
              <Loader2Icon className="animate-spin w-[3.5vw] h-[3.5vw] md:w-[2.5vw] md:h-[2.5vw] lg:w-[1.2vw] lg:h-[1.2vw]" />
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
