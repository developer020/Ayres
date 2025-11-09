-- Create a function to get email from username
CREATE OR REPLACE FUNCTION public.get_email_from_username(input_username text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
BEGIN
  SELECT au.email INTO user_email
  FROM public.profiles p
  JOIN auth.users au ON au.id = p.id
  WHERE p.username = input_username;
  
  RETURN user_email;
END;
$$;