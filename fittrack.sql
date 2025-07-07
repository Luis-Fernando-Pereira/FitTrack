CREATE VIEW listar_dados_treinos AS 
select 
  t.cod_tre AS cod_tre,
  t.descricao_tre AS descricao_tre,
  t.titulo_tre AS titulo_tre,
  t.capa_tre AS capa_tre,
  e.cod_exe AS cod_exe,
  e.duracao_exe AS duracao_exe,
  e.video_exe AS video_exe,
  e.titulo_exe AS titulo_exe,
  e.descricao_exe AS descricao_exe,
  c.cod_cat AS cod_cat,
  c.titulo_cat AS titulo_cat 
  from ((((treino t left join treino_exercicio te on((te.treino = t.cod_tre))) join exercicio e on((e.cod_exe = te.exercicio))) left join categoria_exercicio ce on((ce.exercicio = e.cod_exe))) join categoria c on((c.cod_cat = ce.categoria)))
  ORDER BY te.ordem;