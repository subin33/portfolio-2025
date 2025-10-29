import React from 'react';
import Link from 'next/link';
import ContactForm from './ContactForm';
import SectionTitle from '@/components/ui/common/SectionTitle';

const ContactDetails: React.FC = () => {
  return (
    <>
      <section>
        <div className="w-[85%] h-full mx-auto py-[15%] md:pt-0 md:pb-[10%]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start relative">
            {/* 연락처 정보 섹션 - 왼쪽 사이드바 */}
            <div className="w-full space-y-[7vw] font-heading font-medium pt-4 static md:w-[40%] md:sticky md:top-[2%]">
              <SectionTitle title="Contact" />

              {/* 이메일 연락처 */}
              <div className="flex gap-[8vw] items-center md:gap-[5vw]">
                <h2 className="uppercase text-[4vw] md:text-[3.5vw] lg:text-[1.2vw] w-[20vw] md:w-[15vw] lg:w-[6vw]">
                  Email
                </h2>
                <a
                  data-cursor-size="80px"
                  data-cursor-exclusion
                  className="text-[4.5vw] md:text-[3.5vw] lg:text-[1.4vw]"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=test@naver.com&su=포트폴리오 문의"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Gmail로 이메일 보내기"
                >
                  test@naver.com
                </a>
              </div>

              {/* 사무실 주소 */}
              <div className="flex gap-[8vw] items-center md:gap-[5vw]">
                <h3 className="uppercase text-[4vw] md:text-[3.5vw] lg:text-[1.2vw] w-[20vw] md:w-[15vw] lg:w-[6vw]">
                  Address
                </h3>
                <a
                  data-cursor-size="80px"
                  data-cursor-exclusion
                  className="text-[4.5vw] md:text-[3.5vw] lg:text-[1.4vw]"
                  target="_blank"
                  href="#"
                  rel="noopener noreferrer"
                  aria-label="Google 지도에서 주소 보기"
                >
                  Address
                </a>
              </div>

              {/* 전화번호 */}
              <div className="flex gap-[8vw] items-center md:gap-[5vw]">
                <h4 className="uppercase text-[4vw] md:text-[3.5vw] lg:text-[1.2vw] w-[20vw] md:w-[15vw] lg:w-[6vw]">
                  Phone
                </h4>
                <Link
                  data-cursor-size="80px"
                  data-cursor-exclusion
                  className="text-[4.5vw] md:text-[3.5vw] lg:text-[1.4vw]"
                  href="tel:+82 10 0000 0000"
                >
                  +82 10 0000 0000
                </Link>
              </div>
            </div>

            {/* 프로젝트 문의 폼 섹션 - 오른쪽 메인 영역 */}
            <div className="w-full px-0 pt-[25%] md:w-[55%] md:px-[5%] md:pt-[20%]">
              <h5 className="text-[11vw] leading-[1.1] font-heading font-medium lowercase mb-[8vw] md:text-[8vw] lg:text-[6vw] lg:mb-[4vw]">
                Contact me anytime.
              </h5>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactDetails;
