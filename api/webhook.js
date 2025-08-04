export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const dataFromWorkEasy = req.body;

    // Enviar os dados recebidos para o Tape
    const tapeResponse = await fetch('https://api.tapeapp.com/v1/records/create', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer SEU_TOKEN_DO_TAPE',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: 'SEU_APP_ID_DO_TAPE',
        record: {
          name: dataFromWorkEasy.name,
          employee_id: dataFromWorkEasy.employee_id,
          shift_date: dataFromWorkEasy.shift_date,
          check_in_time: dataFromWorkEasy.check_in_time,
          date: dataFromWorkEasy.date,
          attendance_status: dataFromWorkEasy.attendance_status,
          department_unit: dataFromWorkEasy.department_unit
        }
      })
    });

    const tapeResult = await tapeResponse.json();

    return res.status(200).json({ success: true, tapeResult });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
