import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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
    { value: 'web-design',   labelKey: 'pages.contact.projectTypes.webDesign' },
    { value: 'fullstack',    labelKey: 'pages.contact.projectTypes.fullstack' },
    { value: 'consulting',   labelKey: 'pages.contact.projectTypes.consulting' },
    { value: 'other',        labelKey: 'pages.contact.projectTypes.other' },
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
      href: 'https://linkedin.com/in/cristomacias',
    },
    {
      id: 'mail',
      label: 'Email',
      short: 'GM',
      href: 'mailto:cristomac.izaguirre@gmail.com',
    },
  ];

  constructor(private fb: FormBuilder) {}

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