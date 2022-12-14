import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import notify from 'devextreme/ui/notify';



@Component({ templateUrl: 'login2.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f['username'].value, btoa(this.f['password'].value))
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                    
                },
                error: error => {
                    notify(
                        {
                            message: "Username or password is incorrect", 
                            width: 230,
                            type:'error',
                            position: {
                                at: "bottom",
                                my: "bottom",
                                of: "#container"
                            }
                        }, 
                        
                    );
                    this.loading=false;
                    localStorage.clear();
                
                }
            });
    }
}