package com.qsp.Hospital_Management.service;

import java.time.LocalDate;
import java.util.List;

import com.qsp.Hospital_Management.model.Appointment;

public interface AppointmentService {

	Appointment saveAppointment(Appointment appointment);

    List<Appointment> fetchAllAppointments();

    Appointment fetchAppointmentById(Long appointmentId);

    boolean deleteAppointmentById(Long appointmentId);

    Appointment updateAppointmentById(Long oldappointmentId,Appointment newAppointment);
    List<Appointment> fetchAppointmentsByDate(LocalDate appointmentDate);
}
