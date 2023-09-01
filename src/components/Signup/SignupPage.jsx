import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUp } from 'redux/auth/operations';
import { signUpSchema } from 'schema/signUpSchema';
import {
  BackgroundImage,
  ContainerWelcome,
  SectionWelcome,
  WelcomeWrap,
  Wrapper,
} from 'components/Welcome/WelcomePage.styled';
import { Button, FormIcons, FormMessages } from 'components';
import { Input, InputBox } from 'components/SubscribeForm/SubscribeForm.styled';
import {
  AuthTitle,
  ButtonWrap,
  FormWrap,
  Link,
  LinkWrap,
} from './SignupPage.styled';

export const SignupPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async data => {
    const lowercasedData = {
      ...data,
      email: data.email.toLowerCase(),
    };

    try {
      const response = await dispatch(signUp(lowercasedData));

      if (response.type === 'auth/signup/fulfilled') navigation('/signin');

      reset();
    } catch (error) {
      return console.log(error.message);
    }
  };

  return (
    <BackgroundImage>
      <Wrapper>
        <ContainerWelcome>
          <SectionWelcome>
            <WelcomeWrap>
              <AuthTitle>Registration</AuthTitle>
              <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                  <Input
                    type="name"
                    name="name"
                    placeholder="Name"
                    {...register('name')}
                    valid={isValid}
                    invalid={isDirty && !isValid}
                  />
                  <FormIcons valid={isValid} invalid={!isValid && isDirty} />
                </InputBox>
                <FormMessages
                  invalidValue={errors.name}
                  validValue={isValid && isDirty}
                  errorMessage={errors.name?.message}
                  checkMessage="This is valid name"
                />

                <InputBox>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register('email')}
                    valid={isValid}
                    invalid={isDirty && !isValid}
                  />
                  <FormIcons valid={isValid} invalid={!isValid && isDirty} />
                </InputBox>
                <FormMessages
                  invalidValue={errors.email}
                  validValue={isValid && isDirty}
                  errorMessage={errors.name?.message}
                  checkMessage="This is valid email"
                />

                <InputBox>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register('password')}
                    valid={isValid}
                    invalid={isDirty && !isValid}
                  />
                  <FormIcons valid={isValid} invalid={!isValid && isDirty} />
                </InputBox>
                <FormMessages
                  invalidValue={errors.password}
                  validValue={isValid && isDirty}
                  errorMessage={errors.password?.message}
                  checkMessage="This is valid password"
                />

                <ButtonWrap>
                  <Button
                    disabled={!isValid || !isDirty}
                    transparent
                    minWidth="100%"
                    minHeight="56px"
                  >
                    Sign Up
                  </Button>
                </ButtonWrap>
                <LinkWrap>
                  <Link to="/signin">Sign In</Link>
                </LinkWrap>
              </FormWrap>
            </WelcomeWrap>
          </SectionWelcome>
        </ContainerWelcome>
      </Wrapper>
    </BackgroundImage>
  );
};
