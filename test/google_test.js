import {renderComponent, expect} from './test_helper';
import GoogleLogin from '../src/google';

describe('Google Login', () => {
    const defaultText = 'Login with Google';
    let component;
    let propsObj;

    describe('With default props', () => {

        beforeEach(() => {
            propsObj = {
                onSuccess(response) {},
                onFailure(response) {},
                clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
            };
            component = renderComponent(GoogleLogin, propsObj);
        });
        
        it('shows the button', () => {
            expect(component).to.exist;
        });

        it('displays correct button text', () => {
            expect(component).to.have.text(defaultText);
        });

        it('does not have a class attr', () => {
            expect(component).to.not.have.attr('class');
        });
        
        it('has inline styles', () => {
            expect(component).to.have.attr('style');
        });
        
    });

    describe('With custom text and default props', () => {
        
        const buttonText ='buttonText'; 
        
        beforeEach(() => {
            propsObj = {
                onSuccess(response) {},
                onFailure(response) {},
                clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
                buttonText
            };
            component = renderComponent(GoogleLogin, propsObj);
        });

        it('shows the button', () => {
            expect(component).to.exist;
        });
        
        it('displays correct button text', () => {
            expect(component).to.have.text(buttonText);
        });

        it('does not have a class attr', () => {
            expect(component).to.not.have.attr('class');
        });
        
        it('has inline styles', () => {
            expect(component).to.have.attr('style');
        });

    });

    describe('With custom class and default props', () => {
        
        let className ='test-class'; 
        
        beforeEach(() => {
            propsObj = {
                onSuccess(response) {},
                onFailure(response) {},
                clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
                className
            };
            component = renderComponent(GoogleLogin, propsObj);
        });

        it('shows the button', () => {
            expect(component).to.exist;
        });
        
        it('displays correct button text', () => {
            expect(component).to.have.text(defaultText);
        });

        it('has a class attr with custom class', () => {
            expect(component).to.have.attr('class', className);
        });
        
        it('does not have inline styles', () => {
            expect(component).to.not.have.attr('style');
        });
        
    });

    describe('With children, custom text, and default props', () => {
        
        const children = 'test';
        const buttonText ='buttonText'; 

        beforeEach(() => {
            propsObj = {
                onSuccess(response) {},
                onFailure(response) {},
                clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
                buttonText
            };
            component = renderComponent(GoogleLogin, propsObj, children);
        });
        
        it('shows the button', () => {
            expect(component).to.exist;
        });

        it('displays children text', () => {
            expect(component).to.have.text(children);
        });
        
        it('does not display default text', () => {
            expect(component).to.not.have.text(defaultText);
        });
        
        it('does not display custom text', () => {
            expect(component).to.not.have.text(buttonText);
        });
        
        it('does not have a class attr', () => {
            expect(component).to.not.have.attr('class');
        });
        
        it('has inline styles', () => {
            expect(component).to.have.attr('style');
        });
        
    });

});