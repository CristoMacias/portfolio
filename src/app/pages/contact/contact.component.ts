import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';

interface ContactInfo {
  labelKey: string;
  value: string;
  href?: string;
}

interface SocialLink {
  id: string;
  label: string;
  short: string;
  href: string;
}

interface ProjectType {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  standalone: true,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  isLoading = false;
  submitted = false;

  projectTypes: ProjectType[] = [
    { value: 'web-design', labelKey: 'pages.contact.projectTypes.webDesign' },
    { value: 'fullstack', labelKey: 'pages.contact.projectTypes.fullstack' },
    { value: 'consulting', labelKey: 'pages.contact.projectTypes.consulting' },
    { value: 'other', labelKey: 'pages.contact.projectTypes.other' },
  ];

  contactInfo: ContactInfo[] = [
    {
      labelKey: 'pages.contact.info.email',
      value: 'cristomac.izaguirre@gmail.com',
      href: 'mailto:cristomac.izaguirre@gmail.com',
    },
    {
      labelKey: 'pages.contact.info.location',
      value: 'España · Remoto',
    },
    {
      labelKey: 'pages.contact.info.response',
      value: 'Menos de 24 h',
    },
  ];

  tags: string[] = [
    'pages.contact.tags.design',
    'pages.contact.tags.frontend',
    'pages.contact.tags.backend',
    'pages.contact.tags.supabase',
    'pages.contact.tags.python'
  ];

  socialLinks: SocialLink[] = [
    {
      id: 'github',
      label: 'GitHub',
      short: 'GH',
      href: 'https://github.com/cristomacias',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      short: 'LN',
      href: 'https://www.linkedin.com/feed/',
    },
    {
      id: 'mail',
      label: 'Email',
      short: 'GM',
      href: 'mailto:cristomac.izaguirre@gmail.com',
    },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2)],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      projectType: [
        '',
        Validators.required,
      ],
      message: [
        '',
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  ngAfterViewInit(): void {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });

    tl.from('.js-section-line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.7
    })
      .from('.js-section-text', {
        opacity: 0,
        x: -18,
        duration: 0.6
      }, '-=0.35')
      .from('.js-contact-title', {
        opacity: 0,
        y: 40,
        duration: 0.9
      }, '-=0.15')
      .from('.js-contact-subtitle', {
        opacity: 0,
        y: 24,
        duration: 0.7
      }, '-=0.45')
      .from('.js-contact-availability', {
        opacity: 0,
        y: 16,
        duration: 0.55
      }, '-=0.35')
      .from('.js-form-col', {
        opacity: 0,
        y: 40,
        duration: 0.8
      }, '-=0.15')
      .from('.js-field', {
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.08
      }, '-=0.45')
      .from('.js-info-col', {
        opacity: 0,
        x: 30,
        duration: 0.8
      }, '-=0.75')
      .from('.js-info-number', {
        opacity: 0,
        scale: 0.92,
        duration: 0.45
      }, '-=0.45')
      .from('.js-info-item', {
        opacity: 0,
        y: 16,
        duration: 0.45,
        stagger: 0.08
      }, '-=0.25')
      .from('.js-tag', {
        opacity: 0,
        scale: 0.92,
        duration: 0.35,
        stagger: 0.05
      }, '-=0.2')
      .from('.js-social-btn', {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.06
      }, '-=0.15');
  }


  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  toggleMenu(): void {
    console.log('Toggle mobile menu');
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {
      await this.sendContactEmail(this.contactForm.value);
      this.submitted = true;
      this.contactForm.reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      this.isLoading = false;
    }
  }
  private sendContactEmail(data: {
    name: string;
    email: string;
    projectType: string;
    message: string;
  }): Promise<void> {
    console.log('Form data:', data);
    return new Promise(resolve => setTimeout(resolve, 1200));
  }
}