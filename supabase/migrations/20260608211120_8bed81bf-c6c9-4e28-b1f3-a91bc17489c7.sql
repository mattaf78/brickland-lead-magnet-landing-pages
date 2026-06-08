
-- Storage: downloads bucket — admin-only writes; public read remains (bucket is public)
CREATE POLICY "Public can read downloads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'downloads');

CREATE POLICY "Admins can upload to downloads"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'downloads' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update downloads"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'downloads' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'downloads' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete downloads"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'downloads' AND public.has_role(auth.uid(), 'admin'));

-- user_roles: admin-only writes
CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
